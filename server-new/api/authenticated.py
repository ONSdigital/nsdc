from flask import request, abort
from functools import wraps
from data.user import UserData

# Authentication decorator checks for token in header
def authenticated(func):
    @wraps(func)
    def check_token(*args, **kwargs):
        token = request.headers.get("X-Token")
        if token is None or not UserData.verify_auth_token(token):
            return abort(400)

        return func(*args, **kwargs)

    return check_token
