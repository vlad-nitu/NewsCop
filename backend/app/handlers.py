from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any
from .plagiarism_checker.sanitizing import sanitizing_url
from .plagiarism_checker.fingerprinting import compute_fingerprint
from .plagiarism_checker.crawling import crawl_url

from django.http import HttpResponse, HttpResponseBadRequest
from .models import *


class Handler(ABC):
    """
    The Handler interface used to build the Chain of Responsibility pattern upon.
    It encapsulates also the abstract methods used.
    """

    @abstractmethod
    def set_next(self, handler: Handler) -> Handler:
        pass

    @abstractmethod
    def handle(self, content) -> HttpResponse:
        pass


class AbstractHandler(Handler):
    """
    The base handler class used to implement the chaining behaviour.
    """

    _next_handler: Handler = None

    def set_next(self, handler: Handler) -> Handler:
        self._next_handler = handler
        return handler

    @abstractmethod
    def handle(self, content: str) -> HttpResponse:
        if self._next_handler:
            return self._next_handler.handle(content)

        return HttpResponse(content, status=200)


"""
All the Concrete Handlers used to go thorough checks on the input provided by an user. 
Note that a Concrete Handler either handles a request or passes it to the next handler for further checks.
"""


class SanitizationHandler(AbstractHandler):
    def handle(self, content: str) -> HttpResponse:
        # Check if the content provided (URL) is valid (URL form + actual media content)
        if sanitizing_url(content):
            return super().handle(content)
        else:
            return HttpResponseBadRequest("The url provided is invalid")


class DatabaseHandler(AbstractHandler):
    def handle(self, content: str) -> HttpResponse:
        # Checking if the URL is already presented in the database
        url_exists = db.news_collection.find_one({'_id': content}) is not None
        if url_exists:
            return HttpResponse(content, status=200)
        else:
            return super().handle(content)


class ContentHandler(AbstractHandler):
    def handle(self, content: str) -> HttpResponse:
        # Trying to persist the URL in the database by checking its content
        # Do crawling on the given url
        article_text, _ = crawl_url(content)

        fingerprints = compute_fingerprint(article_text)
        only_shingle_values = [fp['shingle_hash'] for fp in fingerprints]

        # Verify if it has more than 2000 hashes
        if len(only_shingle_values) > 2000:
            return HttpResponseBadRequest("The article given has exceeded the maximum size supported.")

        # Verify if it has any fingerprints
        if len(only_shingle_values) == 0:
            return HttpResponseBadRequest("The article provided has no text.")

        newsdoc = NewsDocument(url=content, fingerprints=only_shingle_values)
        newsdoc.save()

        return super().handle(content)


def persist_chain(request):
    # Initialise handlers
    sanitise = SanitizationHandler()
    database_check = DatabaseHandler()
    content_check = ContentHandler()

    # Do the chaining step
    sanitise.set_next(database_check)
    database_check.set_next(content_check)

    # Handle the input
    return sanitise.handle(request)
