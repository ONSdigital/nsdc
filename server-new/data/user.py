from config import db
from common.serializer import Serializer
from common.auth import Auth

class UserData(db.Model, Serializer, Auth):
    __tablename__ = "user"
    id = db.Column('id', db.Integer, primary_key=True)
    firstname = db.Column('firstname', db.String(50), nullable=False, server_default=u'')
    lastname = db.Column('lastname', db.String(50), server_default=u'')
    email = db.Column('email', db.Unicode(255), server_default=u'', nullable=False, unique=True)
    username = db.Column('username', db.Unicode(255), nullable=False, server_default=u'')
    password = db.Column('password', db.Unicode(255), nullable=False, server_default='')
    created_at = db.Column('user_creationDate', db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)
    status = db.Column('status', db.String(10), nullable=False, server_default='active')
    role_id = db.Column(db.Integer, db.ForeignKey('role.role_id'))
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.supplier_id'))

    def __init__(self, role_id, firstname, lastname, email, username, password, status, supplier_id):
        self.role_id = role_id
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.username = username
        self.password = password
        self.status = status
        self.supplier_id = supplier_id

    def serialize(self):
        return {
            'id': self.id,
            'role_id': self.role_id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'username': self.username,
            'password': self.password,
            'status': self.status,
            'supplier_id': self.supplier_id
        }
