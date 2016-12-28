from flask import jsonify
from flask_restful import Resource

from common.serializer import Serializer
from data.role import RoleData


class Role(Resource, Serializer):
    def get(self, role_id=None):
        if role_id is not None:
            return jsonify(RoleData.query.get(role_id).serialize())
        else:
            return jsonify(RoleData.serialize_list(RoleData.query.all()))

