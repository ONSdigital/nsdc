from config import db
from common.serializer import Serializer


class FileData(db.Model, Serializer):
    __tablename__ = 'file'
    id = db.Column('file_id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(50), nullable=False, server_default=u'')

    def __init__(self, name):
        self.name = name

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }
