from flask import request, abort
from functools import wraps
from data.user import UserData
from itsdangerous import (BadSignature, SignatureExpired)


def authenticated(func):
    @wraps(func)
    def check_token(*args, **kwargs):
        token = request.headers.get("X-Token")
        if token is None:
            return abort(403) # handle no token
        try:
            UserData.verify_auth_token(token)
        except SignatureExpired:
            return abort(403) # handle SignatureExpired
        except BadSignature:
            return abort(403) # handle BadSignature

        return func(*args, **kwargs)

    return check_token
