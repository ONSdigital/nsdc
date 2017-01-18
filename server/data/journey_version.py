from config import db
from common.serializer import Serializer
from data.journey_version_step import journey_version_step


class JourneyVersionData(db.Model, Serializer):
    __tablename__ = 'journey_version'
    id = db.Column('journey_version_id', db.Integer, primary_key=True)
    version_number = db.Column('version_number', db.Integer, nullable=False)
    journey_id = db.Column(db.Integer, db.ForeignKey('journey.journey_id'))
    validator = db.Column('validator', db.String(50), nullable=False, server_default=u'')
    steps = db.relationship('JourneyStepData', secondary=journey_version_step, lazy='dynamic',
                            backref=db.backref('journey_versions', lazy='dynamic'))

    def __init__(self, version_number, journey_id, validator):
        self.version_number = version_number
        self.journey_id = journey_id
        self.validator = validator

    def serialize(self):
        return {
            'id': self.id,
            'version_number': self.version_number,
            'journey_id': self.journey_id,
            'validator': self.validator
        }
