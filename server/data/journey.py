from config import db
from common.serializer import Serializer


class JourneyData(db.Model, Serializer):
    __tablename__ = 'journey'
    id = db.Column('journey_id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(50), nullable=False, server_default=u'')
    description = db.Column('description', db.String(150), nullable=False, server_default=u'')
    validator = db.Column('validator', db.String(50), nullable=False, server_default=u'')

    def __init__(self, name, description, validator):
        self.name = name
        self.description = description
        self.validator = validator

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'validator': self.validator
        }
