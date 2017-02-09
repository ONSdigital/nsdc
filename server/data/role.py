from config import db
from common.serializer import Serializer
from data.role_permission import role_permission
from data.journey_version_role import journey_version_role
from common.common_data import CommonData


class RoleData(CommonData, db.Model, Serializer):
    __tablename__ = 'role'
    id = db.Column('role_id', db.Integer, primary_key=True)
    name = db.Column('name', db.Unicode(255))
    description = db.Column('description', db.Unicode(255))
    timestamp = db.Column('timestamp', db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)
    permissions = db.relationship('PermissionData', secondary=role_permission, lazy='dynamic', backref=db.backref('roles', lazy='dynamic'))
    journey_versions = db.relationship('JourneyVersionData', secondary=journey_version_role, lazy='dynamic', backref=db.backref('roles', lazy='dynamic'))

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }
