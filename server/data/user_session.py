from config import db
from common.serializer import Serializer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text


class UserSessionData(db.Model, Serializer):
    __tablename__ = 'user_session'
    id = db.Column('session_id', UUID(as_uuid=True), default=text('gen_random_uuid()'), primary_key=True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    expiry = db.Column('expiry', db.TIMESTAMP, nullable=False)

    def __init__(self, user_id, expiry):
        self.user_id = user_id
        self.expiry = expiry

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'expiry': self.expiry
        }
