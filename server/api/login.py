from flask import jsonify, abort
from flask_restful import reqparse, Resource
from data.user import UserData as User

parser = reqparse.RequestParser()
parser.add_argument('username')
parser.add_argument('password')


class Login(Resource):
    def post(self):
        request_json = parser.parse_args()
        username = request_json['username']
        password = request_json['password']
        user = User.query.filter(User.username == username, User.password == password).first()
        if not user:
            return abort(400)
        token = user.generate_auth_token()
        return jsonify({
            'token': token,
            'user_id': user.id
        })
