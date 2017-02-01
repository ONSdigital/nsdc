from flask import jsonify, abort
from flask_restful import reqparse, Resource
from config import db
from data.user import UserData
from datetime import datetime, timedelta
from data.user_session import UserSessionData

parser = reqparse.RequestParser()
parser.add_argument('username')
parser.add_argument('password')


class Login(Resource):
    def post(self):
        request_json = parser.parse_args()
        username = request_json['username']
        password = request_json['password']
        user = UserData.query.filter(
            UserData.username == username,
            UserData.password == password,
            UserData.status == 'active'
        ).first()
        if not user:
            return abort(400)
        # create new user session and return session_id
        user_session = UserSessionData(user.id, datetime.now() + timedelta(days=10))

        db.session.add(user_session)
        db.session.commit()
        return jsonify(user_session.serialize())
