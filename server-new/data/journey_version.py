from config import db
from common.serializer import Serializer


class JourneyVersionData(db.Model, Serializer):
    __tablename__ = 'journey_version'
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.supplier_id'), primary_key=True)
    journey_id = db.Column(db.Integer, db.ForeignKey('journey.journey_id'), primary_key=True)
    version_number = db.Column('version_number', db.Integer, primary_key=True)

    @property
    def serializer(self):
        return {
            'supplier_id': self.supplier_id,
            'journey_id': self.journey_id,
            'version_number': self.version_number
        }