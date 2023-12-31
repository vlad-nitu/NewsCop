#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    # The following line is used for setting an environment variable to true,
    # that will be later used to determine the schema
    if 'test' in sys.argv:
        os.environ['RUNNING_TESTS'] = 'True'
    execute_from_command_line(sys.argv)
