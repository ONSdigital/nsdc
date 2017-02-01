from flask import request, abort
from functools import wraps
from data.user import UserData
from data.role import RoleData
from common.session import verify_session_id, SessionExpired, BadSession


def protected_resource(permission_string):
    def decorator(func):
        @wraps(func)
        def check_has_permission(*args, **kwargs):
            session_id = request.headers.get("X-Token")
            if session_id is None:
                return abort(403, 'No session id')

            try:
                session = verify_session_id(session_id)
            except SessionExpired:
                return abort(403, 'Session expired')
            except BadSession:
                return abort(403, 'Bad session id')

            # This gets a list of the users allowed permission short names
            # this can all be cached for the user to reduce DB queries
            role_id = UserData.query.get(session.user_id).role_id
            role = RoleData.query.get(role_id)
            permissions = role.permissions.all()
            permission_short_names = map(lambda permission: permission.short_name, permissions)

            if permission_string in permission_short_names:
                return func(*args, **kwargs)
            return abort(403, 'No Permission') # no permission

        return check_has_permission
    return decorator
