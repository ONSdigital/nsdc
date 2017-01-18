from config import db
from common.serializer import Serializer


class SupplierData(db.Model, Serializer):
    __tablename__ = 'supplier'
    id = db.Column('supplier_id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(50), nullable=False, server_default=u'')
    description = db.Column('description', db.String(150), nullable=False, server_default=u'')

    def __init__(self, name, description):
        self.name = name
        self.description = description

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }
