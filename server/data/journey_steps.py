from config import db
from common.serializer import Serializer


class JourneyStepData(db.Model, Serializer):
    __tablename__ = 'journey_step'
    id = db.Column('step_id', db.Integer, primary_key=True)
    journey_id = db.Column(db.Integer, db.ForeignKey('journey.journey_id'))
    name = db.Column('name', db.String(50), nullable=False, server_default=u'')
    description = db.Column('description', db.String(150), nullable=False, server_default=u'')
    short_name = db.Column('short_name', db.String(20), nullable=False, server_default=u'')

    def serialize(self):
        return {
            'id': self.id,
            'journey_id': self.journey_id,
            'name': self.name,
            'description': self.description,
            'short_name': self.short_name
        }
