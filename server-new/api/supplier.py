from flask import jsonify
from flask_restful import Resource

from common.serializer import Serializer
from data.supplier import SupplierData


class Supplier(Resource, Serializer):
    def get(self):
        suppliers = SupplierData.query.all()
        return jsonify(SupplierData.serialize_list(suppliers))