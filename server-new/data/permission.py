from config import db
from common.serializer import Serializer

class PermissionData(db.Model, Serializer):
    __tablename__ = "permission"
    id = db.Column('permission_id', db.Integer, primary_key=True)
    name = db.Column('name', db.Unicode(255))
    description = db.Column('description', db.Unicode(255))
    short_name = db.Column('short_name', db.Unicode(255))
    timestamp = db.Column('timestamp', db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)

    def __init__(self, name, short_name, description):
        self.name = name
        self.short_name = short_name
        self.description = description

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'short_name': self.short_name,
            'description': self.description
        }
