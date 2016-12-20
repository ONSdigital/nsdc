from flask import Flask, json, request, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.inspection import inspect
from flask_cors import CORS
from functools import wraps
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as TokenSerializer, BadSignature, SignatureExpired)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = '<<postgres url here>>'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SECRET_KEY'] = '<<secret key here>>'
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Initializing the Database creation (similar to models)
db = SQLAlchemy(app)


class Deserialize(object):
    def __init__(self, y):
        self.__dict__ = json.loads(y)


class Serializer(object):
    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}

    @staticmethod
    def serialize_list(l):
        return [m.serialize() for m in l]


role_permission = db.Table('role_permission',
    db.Column('role_id', db.Integer, db.ForeignKey('role.role_id'), nullable=False),
    db.Column('permission_id', db.Integer, db.ForeignKey('permission.permission_id'), nullable=False),
    db.PrimaryKeyConstraint('role_id', 'permission_id')
)


class RolePermissions():
    __tablename__ = 'role_permission'
    id = db.Column(db.Integer, primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    permission_id = db.Column(db.Integer, db.ForeignKey('permission.permission_id'))

    def __init__(self, role_id, permission_id):
        self.role_id=role_id
        self.permission_id = permission_id


class Role(db.Model, Serializer):
    __tablename__ = "role"
    id = db.Column('role_id', db.Integer, primary_key=True)
    role_name = db.Column('role_name', db.Unicode(255))
    role_desc = db.Column('role_desc', db.Unicode(255))
    created_at = db.Column('role_creationDate', db.TIMESTAMP,
                           server_default=db.func.current_timestamp(), nullable=False)
    users = db.relationship('User', backref='role', lazy='dynamic')
    permissions = db.relationship('Permission', secondary=role_permission, backref=db.backref('roles', lazy='dynamic'))

    def __init__(self, role_name, role_desc):
        self.role_name = role_name
        self.role_desc = role_desc

    def serialize(self):
        return {
            'id': self.id,
            'role_name': self.role_name,
            'role_description': self.role_desc
        }


class User(db.Model, Serializer):
    __tablename__ = "user"
    id = db.Column('id', db.Integer, primary_key=True)
    firstname = db.Column('firstname', db.String(50), nullable=False, server_default=u'')
    lastname = db.Column('lastname', db.String(50), server_default=u'')
    email = db.Column('email', db.Unicode(255), server_default=u'', nullable=False, unique=True)
    username = db.Column('username', db.Unicode(255), nullable=False, server_default=u'')
    password = db.Column('password', db.Unicode(255), nullable=False, server_default='')
    created_at = db.Column('user_creationDate', db.TIMESTAMP, server_default=db.func.current_timestamp(),nullable=False)
    status = db.Column('status', db.String(10), nullable=False, server_default='active')
    role_id = db.Column(db.Integer, db.ForeignKey('role.role_id'))

    def __init__(self, role_id, firstname, lastname, email, username, password, status):
        self.role_id = role_id
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.username = username
        self.password = password
        self.status = status

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
        user = User.query.get(data['id'])
        return user

    def serialize(self):
        return {
            'id': self.id,
            'role_id': self.role_id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'username': self.username,
            'password': self.password,
            'status': self.status
        }


class Permission(db.Model, Serializer):
    __tablename__ = "permission"
    id = db.Column('permission_id', db.Integer, primary_key=True)
    role_id = db.Column('role_id', db.Integer, db.ForeignKey(Role.id))
    permission_name = db.Column('permission_name', db.Unicode(255), )
    permission_desc = db.Column('permission_desc', db.Unicode(255), )
    created_at = db.Column('perm_creationDate', db.TIMESTAMP, server_default=db.func.current_timestamp(),nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.role_id'))

    def __init__(self, role_id, permission_name, permission_desc):
        self.role_id = role_id
        self.permission_name = permission_name
        self.permission_desc = permission_desc

    def serialize(self):
        # perm_data = Serializer.serialize(self)
        return {
            'id': self.id,
            'role_id': self.role_id,
            'permission_name': self.permission_name,
            'permission_desc': self.permission_desc
        }

# Authentication decorator checks for token in header
def authenticated(func):
    @wraps(func)
    def check_token(*args, **kwargs):
        token = request.headers.get("X-Token")
        if token is None or not User.verify_auth_token(token):
            return abort(400)

        return func(*args, **kwargs)

    return check_token


# INITIALIZE VIEW SECTION#
#ROLE MANAGE
@app.route('/nsdc/v1.0/add_role', methods=['POST'])
@authenticated
def add_role():
    role_name = request.get_json()["role_name"]
    role = Role(role_name=role_name)
    db.session.add(role)
    db.session.commit()
    return json.dumps(role.serialize())


@app.route('/nsdc/v1.0/roles', methods=['GET'])
@authenticated
def get_roles():
    roles = Role.query.all()
    return json.dumps(Role.serialize_list(roles))


@app.route('/nsdc/v1.0/roles/<int:role_id>', methods=['GET'])
@authenticated
def get_role(role_id):
    role = Role.query.get(role_id)
    return json.dumps(role.serialize())


@app.route('/nsdc/v1.0/roles/<int:role_id>', methods = ['DELETE'])
@authenticated
def delete_role(role_id):
    role = Role.query.get(role_id)
    db.session.delete(role)
    db.session.commit()
    return json.dumps(role.serialize())


@app.route('/nsdc/v1.0/roles/<int:role_id>', methods=['PUT'])
@authenticated
def update_role(role_id):
    role = Role.query.get(role_id)
    if "role_name" in request.json:
        role_name = request.get_json()["role_name"]
        role.role_name = role_name
    db.session.commit()
    return json.dumps(role.serialize())


# PERMISSION MANAGE
@app.route('/nsdc/v1.0/add_permission', methods=['POST'])
@authenticated
def add_permission():
    role_id = request.get_json()["role_id"]
    permission_name = request.get_json()["permission_name"]
    permission_desc = request.get_json()["permission_desc"]
    permission = Permission(role_id=role_id, permission_name=permission_name, permission_desc=permission_desc)
    db.session.add(permission)
    db.session.commit()
    return json.dumps(permission.serialize())


@app.route('/nsdc/v1.0/permissions', methods=['GET'])
@authenticated
def get_permissions():
    permissions = Permission.query.all()
    return json.dumps(Permission.serialize_list(permissions))


@app.route('/nsdc/v1.0/permissions/<int:permission_id>', methods = ['DELETE'])
@authenticated
def delete_permission(permission_id):
    permission = Permission.query.get(permission_id)
    db.session.delete(permission)
    db.session.commit()
    return json.dumps(permission.serialize())


@app.route('/nsdc/v1.0/permissions/role/<int:role_id>', methods=['GET'])
@authenticated
def get_permission_by_role(role_id):
    permissions = Permission.query.filter(Permission.role_id == role_id)
    return json.dumps(Permission.serialize_list(permissions))


@app.route('/nsdc/v1.0/permissions/<int:permission_id>', methods=['PUT'])
@authenticated
def update_permission(permission_id):
    permission = Permission.query.get(permission_id)
    if "role_id" in request.json:
        role_id = request.get_json()["role_id"]
        permission.role_id = role_id
    if "permission_name" in request.json:
        perm_name = request.get_json()["permission_name"]
        permission.permission_name = perm_name
    if "permission_desc" in request.json:
        perm_desc = request.get_json()["permission_desc"]
        permission.permission_desc = perm_desc
    db.session.commit()
    return json.dumps(permission.serialize())


#USER MANAGE
@app.route('/nsdc/v1.0/users/add', methods=['POST'])
@authenticated
def add_user():
    role_id = request.get_json()["role_id"]
    firstname = request.get_json()["firstname"]
    lastname = request.get_json()["lastname"]
    email = request.get_json()["email"]
    username = request.get_json()["username"]
    password = request.get_json()["password"]
    status = request.get_json()["status"]

    user = User(role_id=role_id, firstname=firstname, lastname=lastname,
                email=email, username=username, password=password, status=status)
    db.session.add(user)
    db.session.commit()
    return json.dumps(User.serialize(user))


@app.route('/nsdc/v1.0/users/<int:id>', methods=['PUT'])
@authenticated
def update_user(id):
    user = User.query.get(id)
    if "role_id" in request.json:
        role_id = request.get_json()["role_id"]
        user.role_id = role_id
    if "firstname" in request.json:
        firstname = request.get_json()["firstname"]
        user.firstname = firstname
    if "lastname" in request.json:
        lastname = request.get_json()["lastname"]
        user.lastname = lastname
    if "email" in request.json:
        email = request.get_json()["email"]
        user.email = email
    if "username" in request.json:
        username = request.get_json()["username"]
        user.username = username
    if "password" in request.json:
        password = request.get_json()["password"]
        user.password = password
    if "status" in request.json:
        status = request.get_json()["status"]
        user.status = status
    db.session.commit()
    return json.dumps(user.serialize())


@app.route('/nsdc/v1.0/users', methods=['GET'])
@authenticated
def get_users():
    users = User.query.all()
    return json.dumps(User.serialize_list(users))


@app.route('/nsdc/v1.0/users/<int:id>', methods=['GET'])
@authenticated
def get_user(id):
    user = User.query.get(id)
    return json.dumps(user.serialize()) # To return single object


@app.route('/nsdc/v1.0/users/role/<int:role_id>', methods=['GET'])
@authenticated
def get_user_by_role(role_id):
    users = User.query.filter(User.role_id == role_id)
    return json.dumps(User.serialize_list(users))


@app.route('/nsdc/v1.0/users/<int:id>', methods=['DELETE'])
@authenticated
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return json.dumps(user.serialize())


@app.route('/nsdc/v1.0/login', methods=['POST'])
def login():
    request_json = request.get_json()
    username = request_json['username']
    password = request_json['password']
    user = User.query.filter(User.username == username and User.password == password).first()
    if not user:
        return False
    token = user.generate_auth_token()
    return json.dumps({'token': token})

if __name__ == '__main__':
    app.run(debug=True)
