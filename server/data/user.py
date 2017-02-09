from config import db
from common.serializer import Serializer
from common.common_data import CommonData


class UserData(CommonData, db.Model, Serializer):
    __tablename__ = "user"
    id = db.Column('user_id', db.Integer, primary_key=True)
    firstname = db.Column('firstname', db.String(50), nullable=False, server_default=u'')
    lastname = db.Column('lastname', db.String(50), server_default=u'')
    email = db.Column('email', db.Unicode(255), server_default=u'', nullable=False, unique=True)
    username = db.Column('username', db.Unicode(255), nullable=False, server_default=u'', unique=True)
    password = db.Column('password', db.Unicode(255), nullable=False, server_default='')
    created_at = db.Column('user_creationDate', db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)
    status = db.Column('status', db.String(10), nullable=False, server_default='active')
    role_id = db.Column(db.Integer, db.ForeignKey('role.role_id'))

