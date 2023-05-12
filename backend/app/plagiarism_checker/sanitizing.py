from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
import requests


def sanitizing_url(url):
    '''
    Function for sanitizing the input given by the client in a request body.
    This ensures that we don't process invalid requests so that our application doesn't propagate the error
    in the code (check if url valid and if there is actually an existing internet content at the specified input)
    :param url: the url to be sanitized
    :return: True if the url is valid or False otherwise
    '''
    # check to see if valid url
    validation = URLValidator()
    try:
        validation(url)
    except ValidationError as exception:
        return False

    # check to see of the url accesses an existent internet resource
    try:
        requests.get(url, timeout=10)
    except requests.ConnectionError as exception:
        return False

    return True
