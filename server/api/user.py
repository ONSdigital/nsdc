from config import db
from flask import jsonify
from authenticated_resource import AuthenticatedResource
from flask_restful import reqparse
from data.user import UserData

parser = reqparse.RequestParser()
parser.add_argument("firstname")
parser.add_argument("lastname")
parser.add_argument("email")
parser.add_argument("username")
parser.add_argument("password")
parser.add_argument("status")
parser.add_argument("role_id", required=True, type=int, help='Role is required')
parser.add_argument("supplier_id", required=True, type=int, help='Supplier is required')


class User(AuthenticatedResource):

    def get(self, user_id=None, role_id=None):
        if user_id is not None:
            user = UserData.query.get(user_id)
            return jsonify(user.serialize())
        if role_id is not None:
            users = UserData.query.filter(UserData.role_id == role_id)
            return jsonify(UserData.serialize_list(users))
        else:
            users = UserData.query.all()
            return jsonify(UserData.serialize_list(users))

    def post(self):
        request = parser.parse_args()
        user = UserData(
            role_id=request["role_id"],
            firstname=request["firstname"],
            lastname=request["lastname"],
            email=request["email"],
            username=request["username"],
            password=request["password"],
            status=request["status"],
            supplier_id=request["supplier_id"]
        )

        db.session.add(user)
        db.session.commit()
        return jsonify(user.serialize())

    def put(self, user_id):
        user = UserData.query.get(user_id)
        request_json = parser.parse_args()
        if request_json["role_id"] is not None:
            user.role_id = request_json["role_id"]
        if request_json["firstname"] is not None:
            user.firstname = request_json["firstname"]
        if request_json["lastname"] is not None:
            user.lastname = request_json["lastname"]
        if request_json["email"] is not None:
            user.email = request_json["email"]
        if request_json["username"] is not None:
            user.username = request_json["username"]
        if request_json["password"] is not None:
            password = request_json["password"]
            # TODO: hash/salt
            user.password = password
        if request_json["status"] is not None:
            user.status = request_json["status"]
        if request_json["supplier_id"] is not None:
            user.supplier_id = request_json["supplier_id"]
        db.session.commit()
        return jsonify(user.serialize())

    def delete(self, user_id):
        UserData.query.filter_by(id=user_id).delete()
        db.session.commit()
        return '', 204
