from config import db
from flask import jsonify, request
from flask_restful import reqparse, Resource
from protected_resource import protected_resource
from data.user import UserData

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
    def get(self, user_id=None, role_id=None):
        if user_id is not None:
            user = UserData.query.get(user_id)
            return jsonify(user.serialize())
        if role_id is not None:
            users = UserData.query.filter(UserData.role_id == role_id)
            return jsonify(UserData.serialize_list(users))
        else:
            show_inactive = request.args.get('showInactive')
            if show_inactive == 'true':
                users = UserData.query
            else:
                users = UserData.query.filter(UserData.status == 'active')
            return jsonify(UserData.serialize_list(users.order_by(UserData.username.asc()).all()))

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
        db.session.commit()
        return jsonify(user.serialize())
