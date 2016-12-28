from flask import jsonify
from authenticated_resource import AuthenticatedResource

from common.serializer import Serializer
from data.role import RoleData


class Role(AuthenticatedResource, Serializer):
    def get(self, role_id=None):
        if role_id is not None:
            role = RoleData.query.get(role_id).serialize()
            return jsonify(role)
        else:
            return jsonify(RoleData.serialize_list(RoleData.query.all()))

