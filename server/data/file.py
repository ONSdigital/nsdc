from config import db
from common.serializer import Serializer


class FileData(db.Model, Serializer):
    __tablename__ = 'file'
    id = db.Column('file_id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(50), nullable=False, server_default=u'')
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedule.schedule_id'))
    timestamp = db.Column('timestamp', db.TIMESTAMP, server_default=db.func.current_timestamp(),nullable=False)

    def __init__(self, name, schedule_id):
        self.name = name
        self.schedule_id = schedule_id

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'schedule_id': self.schedule_id,
            'timestamp': self.timestamp
        }
