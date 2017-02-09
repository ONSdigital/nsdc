from config import db
from common.serializer import Serializer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text
from common.common_data import CommonData


class UserSessionData(CommonData, db.Model, Serializer):
    __tablename__ = 'user_session'
    id = db.Column('session_id', UUID(as_uuid=True), default=text('gen_random_uuid()'), primary_key=True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    expiry = db.Column('expiry', db.TIMESTAMP, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'expiry': self.expiry
        }
