from __future__ import annotations

from abc import ABC, abstractmethod

from app.models import NewsDocument
from .plagiarism_checker.sanitizing import sanitizing_url
from .plagiarism_checker.fingerprinting import compute_fingerprint
from .plagiarism_checker.crawling import crawl_url

from django.http import HttpResponse, HttpResponseBadRequest
from utils import conn


class Handler(ABC):
    """
    The Handler interface used to build the Chain of Responsibility pattern upon.
    It encapsulates also the abstract methods used.
    """

    """
    Abstract method of the interface corresponding to setting the next handler in the chain.
    :handler: the next Handler in the chain.
    """

    @abstractmethod
    def set_next(self, handler: Handler) -> Handler:
        pass

    """Abstract method  of the interface for handling the content in the current handler. Note that fif the check 
    passes for this handler, the content will be forwarded to the next handler for further checks.
    :content: the content (URL) to be processed for checks.
    """

    @abstractmethod
    def handle(self, content) -> HttpResponse:
        pass


class AbstractHandler(Handler):
    """
    The base handler class used to implement the chaining behaviour.
    """

    _next_handler: Handler = None

    """
    Method for setting the next handler in the chain.
    :handler: the next Handler in the chain.
    """

    def set_next(self, handler: Handler) -> Handler:
        self._next_handler = handler
        return handler

    """
    Method for handling the content which sends the content to the next handler to be checked, or if the next handler 
    is None (meaning that the chain reached its end) a HttpResponse 200 is send since all checks in the chain passed.
    :content: the content (URL) to be processed for checks.
    """

    @abstractmethod
    def handle(self, content: str) -> HttpResponse:
        if self._next_handler:
            return self._next_handler.handle(content)

        return HttpResponse(content, status=200)


"""
All the Concrete Handlers used to go thorough checks on the input provided by an user. 
Note that a Concrete Handler either handles a request or passes it to the next handler for further checks.
"""

"""
Concrete Handler for verifying if the content (URL) is valid.
"""


class SanitizationHandler(AbstractHandler):
    def handle(self, content: str) -> HttpResponse:
        # Check if the content provided (URL) is valid (URL form + actual media content)
        if sanitizing_url(content):
            return super().handle(content)
        else:
            return HttpResponseBadRequest("The url provided is invalid")


"""
Concrete Handler for verifying if the content is persisted in the DB or it needs to be persisted.
"""


class DatabaseHandler(AbstractHandler):
    def handle(self, content: str) -> HttpResponse:
        # Create a cursor that returns a dictionary as a result
        cur = conn.cursor()

        # Checking if the URL is already presented in the database
        cur.execute("SELECT 1 FROM news_schema.urls WHERE url = %s LIMIT 1", (content,))
        url_exists = cur.fetchone() is not None

        # Close the cursor
        cur.close()

        if url_exists:
            return HttpResponse(content, status=200)
        else:
            return super().handle(content)


"""
Concrete Handler for verifying if the text of the content (URL) is valid (has text and does not exceed the limit).
"""


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


"""
Function created for creating the Chain of Responsibility used in the persist functionality.
This creates a SanitizationHandler -> DatabaseHandler -> ContentHandler chain and passes the request body through it
for getting a Response representing whether the URL passed all the checks or not.
"""


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
