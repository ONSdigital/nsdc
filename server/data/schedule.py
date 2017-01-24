from config import db
from common.serializer import Serializer


class ScheduleData(db.Model, Serializer):
    __tablename__ = 'schedule'
    id = db.Column('schedule_id', db.Integer, primary_key=True)
    status = db.Column('status', db.String(10), nullable=False, server_default='pending')
    date = db.Column('date', db.DATE, nullable=False)
    journey_version_id = db.Column(db.Integer, db.ForeignKey('journey_version.journey_version_id'))

    def __init__(self, date, status, journey_version_id):
        self.date = date
        self.status = status
        self.journey_version_id = journey_version_id

    def serialize(self):
        return {
            'id': self.id,
            'status': self.status,
            'date': self.date,
            'journey_version_id': self.journey_version_id
        }
