from flask import request, abort, jsonify
from flask_restful import Resource
from common.session import verify_session_id, SessionExpired, BadSession
from data.user import UserData
from data.role import RoleData


class Self(Resource):
    def get(self):
        session_id = request.headers.get("X-Token")
        if session_id is None:
            return abort(403)  # handle no session_id
        try:
            user_session = verify_session_id(session_id)
        except SessionExpired:
            return abort(403)
        except BadSession:
            return abort(403)

        user = UserData.query.get(user_session.user_id)
        role = RoleData.query.get(user.role_id)
        return jsonify({'user': user.serialize(), 'role': role.serialize()})
