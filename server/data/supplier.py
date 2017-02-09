from config import db
from common.serializer import Serializer
from common.common_data import CommonData


class SupplierData(CommonData, db.Model, Serializer):
    __tablename__ = 'supplier'
    id = db.Column('supplier_id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(50), nullable=False, server_default=u'')
    description = db.Column('description', db.String(150), nullable=False, server_default=u'')

