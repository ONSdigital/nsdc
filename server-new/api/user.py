from config import db
from flask import jsonify, abort
from authenticated_resource import AuthenticatedResource
from flask_restful import reqparse

from common.serializer import Serializer
from data.user import UserData

# put in init?
parser = reqparse.RequestParser()
parser.add_argument('firstname')
parser.add_argument('lastname')
parser.add_argument("role_id")
parser.add_argument("firstname")
parser.add_argument("lastname")
parser.add_argument("email")
parser.add_argument("username")
parser.add_argument("password")
parser.add_argument("status")

# i dont like this but feels wierd having these classes in seperate files

class User(AuthenticatedResource, Serializer):

    def get(self, user_id):
        user = UserData.query.get(user_id)
        return jsonify(user.serialize()) 

    def put(self, user_id):
        user = UserData.query.get(user_id)
        request_json = parser.parse_args()
        # TODO Must be a nicer way to do this
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

    def delete(self, user_id):
        UserData.query.get(user_id).delete()
        db.session.commit()
        return ('', 204)


class UserList(AuthenticatedResource, Serializer):
    def get(self):
        Users = UserData.query.all()
        return jsonify(UserData.serialize_list(Users))

class AddUser(AuthenticatedResource, Serializer):
    def post(self):
        request_json = parser.parse_args()
        role_id = request_json["role_id"]
        firstname = request_json["firstname"]
        lastname = request_json["lastname"]
        email = request_json["email"]
        username = request_json["username"]
        password = request_json["password"]
        status = request_json["status"]
        # supplier_id
        user = UserData(role_id=role_id, firstname=firstname, lastname=lastname, \
                email=email, username=username, password=password, status=status)
        db.session.add(user)
        db.session.commit()
        return jsonify(UserData.serialize(user))
