from config import db
from common.serializer import Serializer


class FileData(db.Model, Serializer):
    __tablename__ = 'file'
    id = db.Column('file_id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(50), nullable=False, server_default=u'')
    journey_id = db.Column(db.Integer, db.ForeignKey('journey.journey_id'))

    def __init__(self, name, journey_id):
        self.name = name
        self.journey_id = journey_id

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'journey_id': self.journey_id
        }
