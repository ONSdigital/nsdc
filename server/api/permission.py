from config import db
from flask import jsonify
from flask_restful import reqparse, Resource
from protected_resource import protected_resource
from data.permission import PermissionData
from data.role import RoleData
from data.user import UserData
from common.request_resource import RequestResource

parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('description')
parser.add_argument('short_name')


class Permission(Resource):

    @protected_resource('VIEW_PERMISSIONS')
    def get(self, role_id=None, user_id=None, permission_id=None):

        if permission_id is not None:
            permission = PermissionData.query.get(permission_id)
            return jsonify(permission.serialize())

        if role_id is not None:
            permissions = RoleData.query.get(role_id).permissions
        elif user_id is not None:
            permissions = RoleData.query.get(UserData.query.get(user_id).role_id).permissions
        else:
            permissions = PermissionData.query
        return jsonify(PermissionData.serialize_list(permissions.order_by(PermissionData.name.asc()).all()))

    @protected_resource('ADD_PERMISSIONS')
    def post(self):
        request_json = parser.parse_args()
        permission = PermissionData(
            request_json['name'],
            request_json['short_name'],
            request_json['description']
        )

        db.session.add(permission)
        db.session.commit()
        return jsonify(permission.serialize())

    @protected_resource('EDIT_PERMISSIONS')
    def put(self, permission_id):
        altered_data = RequestResource.put(permission_id, PermissionData, parser.parse_args())
        db.session.commit()
        return jsonify(altered_data.serialize())

    @protected_resource('DELETE_PERMISSIONS')
    def delete(self, permission_id):
        return RequestResource.delete(permission_id, PermissionData)
