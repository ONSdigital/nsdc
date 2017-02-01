from config import db
from common.serializer import Serializer


class JourneyData(db.Model, Serializer):
    __tablename__ = 'journey'
    id = db.Column('journey_id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(50), nullable=False, server_default=u'')
    description = db.Column('description', db.String(150), nullable=False, server_default=u'')
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.supplier_id'))

    def __init__(self, name, description, supplier_id):
        self.name = name
        self.description = description
        self.supplier_id = supplier_id

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'supplier_id': self.supplier_id
        }
