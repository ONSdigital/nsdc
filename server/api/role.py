from config import db
from flask import jsonify
from protected_resource import ProtectedResource
from flask_restful import reqparse
from data.role import RoleData


parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('description')

# all role endpoints are protected by the permission short name 'TEST_PERM'
# will modify later e.g. to apply to only get endpoints
class Role(ProtectedResource('TEST_PERM')):
    def get(self, role_id=None):
        if role_id is not None:
            role = RoleData.query.get(role_id).serialize()
            return jsonify(role)
        else:
            return jsonify(RoleData.serialize_list(RoleData.query.all()))

    def post(self):
        request = parser.parse_args()
        role = RoleData(
            name=request["name"],
            description=request["description"]
        )

        db.session.add(role)
        db.session.commit()
        return jsonify(RoleData.serialize(role))

    def put(self, role_id):
        role = RoleData.query.get(role_id)
        request_json = parser.parse_args()

        if request_json["name"] is not None:
            role.name = request_json["name"]
        if request_json["description"] is not None:
            role.description = request_json["description"]

        db.session.commit()
        return jsonify(role.serialize())
