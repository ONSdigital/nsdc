from config import app
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as TokenSerializer, BadSignature, SignatureExpired)

class Auth(object):
    id = None
    def generate_auth_token(self, expiration=1440):
        s = TokenSerializer(app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(token):
        s = TokenSerializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None    # valid token, but expired
        except BadSignature:
            return None    # invalid token
        return data['id']
