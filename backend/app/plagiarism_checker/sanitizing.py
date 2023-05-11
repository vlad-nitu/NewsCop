from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
import requests


def sanitizing_url(url):
    # check to see if valid url
    validation = URLValidator()
    try:
        validation(url)
    except ValidationError as exception:
        return False

    # check to see of the url accesses an existent internet resource
    try:
        requests.get(url, timeout=3)
    except requests.ConnectionError as exception:
        return False

    return True
