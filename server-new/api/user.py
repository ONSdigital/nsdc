from flask import jsonify
from authenticated_resource import AuthenticatedResource

from common.serializer import Serializer
from data.user import UserData


class User(AuthenticatedResource, Serializer):
    def get(self):
        Users = UserData.query.all()
        return jsonify(UserData.serialize_list(Users))