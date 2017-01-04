from config import db
from flask import jsonify, request
from authenticated_resource import AuthenticatedResource
from flask_restful import reqparse
from data.role import RoleData
from data.permission import PermissionData


class RolePermission(AuthenticatedResource):
    def post(self, role_id):
        role = RoleData.query.get(role_id)
        permission_ids = request.json['permissions']
        permissions = PermissionData.query.filter(PermissionData.id.in_(permission_ids)).all()
        role.permissions = permissions
        db.session.commit()
        return jsonify(PermissionData.serialize_list(role.permissions))
