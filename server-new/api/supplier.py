from flask import jsonify
from authenticated_resource import AuthenticatedResource

from common.serializer import Serializer
from data.supplier import SupplierData


class Supplier(AuthenticatedResource, Serializer):
    def get(self):
        suppliers = SupplierData.query.all()
        return jsonify(SupplierData.serialize_list(suppliers))