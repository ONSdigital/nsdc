from flask import jsonify
from flask_restful import Resource
from data.supplier import SupplierData


class Supplier(Resource):
    def get(self):
        suppliers = SupplierData.query.all()
        return jsonify(SupplierData.serialize_list(suppliers))
