from config import db
from flask import jsonify
from protected_resource import protected_resource
from flask_restful import reqparse, Resource
from data.role import RoleData
from common.request_resource import RequestResource

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
        altered_data = RequestResource.put(role_id, RoleData, parser.parse_args())
        db.session.commit()
        return jsonify(altered_data.serialize())

    @protected_resource('DELETE_ROLES')
    def delete(self, role_id):
        return RequestResource.delete(role_id, RoleData)
