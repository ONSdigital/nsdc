from data.user_session import UserSessionData
from datetime import datetime


class BadSession(Exception):
    pass


class SessionExpired(Exception):
    pass


def verify_session_id(session_id):
    session = UserSessionData.query.get(session_id)
    if session is None:
        raise BadSession
    if session.expiry < datetime.now():
        raise SessionExpired
    return session
