from flask_restful import Resource
from api.authenticated import authenticated


class AuthenticatedResource(Resource):
    method_decorators = [authenticated]
