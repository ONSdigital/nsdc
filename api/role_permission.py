from config import db
from flask import jsonify, request
from protected_resource import protected_resource
from flask_restful import Resource
from data.role import RoleData
from data.permission import PermissionData


class RolePermission(Resource):

    @protected_resource('VIEW_ROLES')
    def post(self, role_id):
        role = RoleData.query.get(role_id)
        permission_ids = request.json['permissions']
        permissions = PermissionData.query.filter(PermissionData.id.in_(permission_ids)).all()
        role.permissions = permissions
        db.session.commit()
        return jsonify(PermissionData.serialize_list(role.permissions))
