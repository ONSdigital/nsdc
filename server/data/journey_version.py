from config import db
from common.serializer import Serializer
from data.journey_version_step import journey_version_step


class JourneyVersionData(db.Model, Serializer):
    __tablename__ = 'journey_version'
    id = db.Column('journey_version_id', db.Integer, primary_key=True)
    version_number = db.Column('version_number', db.Integer, nullable=False)
    journey_id = db.Column(db.Integer, db.ForeignKey('journey.journey_id'))
    validator = db.Column('validator', db.String(50), nullable=False, server_default=u'')
    extensions = db.Column('extensions', db.String(150), nullable=False, server_default=u'')
    protocol = db.Column('protocol', db.String(10), nullable=False, server_default='default')
    journey_steps = db.relationship('JourneyStepData', secondary=journey_version_step, lazy='dynamic',
                            backref=db.backref('journey_versions', lazy='dynamic'))

    def __init__(self, args):
        for arg in args:
            setattr(self, arg, args[arg])

    def serialize(self):
        return {
            'id': self.id,
            'version_number': self.version_number,
            'journey_id': self.journey_id,
            'validator': self.validator,
            'extensions': self.extensions,
            'protocol': self.protocol
        }
