from config import app
from itsdangerous import (JSONWebSignatureSerializer as TokenSerializer)

class Auth(object):
    id = None
    def generate_auth_token(self):
        s = TokenSerializer(app.secret_key)
        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(token):
        s = TokenSerializer(app.secret_key)
        data = s.loads(token)
        return data['id']
