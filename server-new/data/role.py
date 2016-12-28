from config import db
from common.serializer import Serializer


class RoleData(db.Model, Serializer):
    __tablename__ = 'role'
    id = db.Column('role_id', db.Integer, primary_key=True)
    name = db.Column('name', db.Unicode(255))
    description = db.Column('description', db.Unicode(255))
    timestamp = db.Column('timestamp', db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }
