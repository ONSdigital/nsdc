from flask import request, abort
from functools import wraps
from common.session import verify_session_id, SessionExpired, BadSession


def authenticated(func):
    @wraps(func)
    def check_session(*args, **kwargs):
        session_id = request.headers.get("X-Token")
        if session_id is None:
            return abort(403) # handle no session_id
        try:
            verify_session_id(session_id)
        except SessionExpired:
            return abort(403)
        except BadSession:
            return abort(403)

        return func(*args, **kwargs)

    return check_session
