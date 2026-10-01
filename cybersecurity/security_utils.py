import re


def sanitize_input(user_input):
    """
    Removes unnecessary spaces and
    normalizes user input.
    """

    if not isinstance(user_input, str):
        return ""

    return user_input.strip()


def validate_email(email):
    """
    Checks whether an email has a basic valid format.
    """

    pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"

    return bool(re.match(pattern, email))


def validate_username(username):
    """
    Allows letters, numbers and underscore.
    """

    if not username:
        return False

    pattern = r"^[A-Za-z0-9_]{3,30}$"

    return bool(re.match(pattern, username))


def is_empty(value):
    """
    Checks whether input is empty.
    """

    return not value or not str(value).strip()