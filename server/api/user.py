from config import db
from flask import jsonify
from flask_restful import reqparse, Resource
from protected_resource import protected_resource
from data.user import UserData
from common.request_resource import RequestResource

parser = reqparse.RequestParser()
parser.add_argument("firstname")
parser.add_argument("lastname")
parser.add_argument("email")
parser.add_argument("username")
parser.add_argument("password")
parser.add_argument("status")
parser.add_argument("role_id", type=int)


class User(Resource):

    @protected_resource('VIEW_USERS')
    def get(self, user_id=None, role_id=None, status=None):
        if user_id is not None:
            user = UserData.query.get(user_id)
            return jsonify(user.serialize())
        if role_id is not None:
            users = UserData.query.filter(UserData.role_id == role_id)
            return jsonify(UserData.serialize_list(users))
        elif status is not None:
            users = UserData.query.filter(UserData.status == status)
            return jsonify(UserData.serialize_list(users))
        else:
            return jsonify(UserData.serialize_list(UserData.query.order_by(UserData.username.asc()).all()))

    @protected_resource('ADD_USERS')
    def post(self):
        request = parser.parse_args()
        user = UserData(
            role_id=request["role_id"],
            firstname=request["firstname"],
            lastname=request["lastname"],
            email=request["email"],
            username=request["username"],
            password=request["password"],
            status=request["status"]
        )

        db.session.add(user)
        db.session.commit()
        return jsonify(user.serialize())

    @protected_resource('EDIT_USERS')
    def put(self, user_id):
        altered_data = RequestResource.put(user_id, UserData, parser.parse_args())
        db.session.commit()
        return jsonify(altered_data.serialize())
