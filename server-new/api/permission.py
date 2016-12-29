from config import db
from flask import jsonify
from flask_restful import reqparse
from authenticated_resource import AuthenticatedResource

from data.permission import PermissionData

parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('description')
parser.add_argument('short_name')

class Permission(AuthenticatedResource):

    def get(self, role_id=None):
        if role_id is not None:
            permissions = PermissionData.query.filter(PermissionData.role_id == role_id)
        return jsonify(permissions)

    def post(self):
        request_json = parser.parse_args()
        # TODO
        return jsonify(request_json)

    def put(self, permission_id):
        permission = PermissionData.query.get(permission_id)
        # TODO
        db.session.commit()
        return jsonify(permission.serialize())

    def delete(self, permission_id):
        PermissionData.query.get(permission_id).delete()
        db.session.commit()
        return ('', 204)

class PermissionList(AuthenticatedResource):
    def get(self):
        permissions = PermissionData.query.all()
        return jsonify(PermissionData.serialize_list(permissions))
