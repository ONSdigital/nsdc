from config import db
from flask import jsonify
from protected_resource import protected_resource
from flask_restful import reqparse, Resource
from data.role import RoleData


parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('description')


class Role(Resource):

    @protected_resource('VIEW_ROLES')
    def get(self, role_id=None):
        if role_id is not None:
            role = RoleData.query.get(role_id).serialize()
            return jsonify(role)
        else:
            return jsonify(RoleData.serialize_list(RoleData.query.order_by(RoleData.name.asc()).all()))

    @protected_resource('ADD_ROLES')
    def post(self):
        request = parser.parse_args()
        role = RoleData(
            name=request["name"],
            description=request["description"]
        )

        db.session.add(role)
        db.session.commit()
        return jsonify(RoleData.serialize(role))

    @protected_resource('EDIT_ROLES')
    def put(self, role_id):
        role = RoleData.query.get(role_id)
        request_json = parser.parse_args()

        if request_json["name"] is not None:
            role.name = request_json["name"]
        if request_json["description"] is not None:
            role.description = request_json["description"]

        db.session.commit()
        return jsonify(role.serialize())

    @protected_resource('DELETE_ROLES')
    def delete(self, role_id):
        RoleData.query.filter_by(id=role_id).delete()
        db.session.commit()
        return '', 204
