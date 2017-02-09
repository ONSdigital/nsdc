from config import db
from common.serializer import Serializer
from common.common_data import CommonData


class JourneyData(CommonData, db.Model, Serializer):
    __tablename__ = 'journey'
    id = db.Column('journey_id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(50), nullable=False, server_default=u'')
    description = db.Column('description', db.String(150), nullable=False, server_default=u'')
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.supplier_id'))
