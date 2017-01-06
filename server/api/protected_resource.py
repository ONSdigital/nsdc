from flask import request, abort
from flask_restful import Resource
from functools import wraps
from data.user import UserData
from data.role import RoleData
from common.session import verify_session_id, SessionExpired, BadSession


def protected_decorator_factory(permission_string):
    def decorator(func):
        @wraps(func)
        def check_has_permission(*args, **kwargs):
            session_id = request.headers.get("X-Token")
            if session_id is None:
                return abort(403)

            try:
                session = verify_session_id(session_id)
            except SessionExpired:
                return abort(403)
            except BadSession:
                return abort(403)

            # This gets a list of the users allowed permission short names
            # this can all be cached for the user to reduce DB queries
            role_id = UserData.query.get(session.user_id).role_id
            role = RoleData.query.get(role_id)
            permissions = role.permissions.all()
            permission_short_names = map(lambda permission: permission.short_name, permissions)

            if permission_string in permission_short_names:
                return func(*args, **kwargs)
            return abort(403) # no permission

        return check_has_permission
    return decorator

def ProtectedResource(permission_string):

    class Protected(Resource):
        method_decorators = [protected_decorator_factory(permission_string)]
    return Protected
