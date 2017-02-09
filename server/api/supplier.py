from config import db
from flask import jsonify, abort
from flask_restful import reqparse, Resource
from protected_resource import protected_resource
from data.supplier import SupplierData
from common.request_resource import RequestResource


parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('description')


class Supplier(Resource):
    @protected_resource('VIEW_JOURNEYS')
    def get(self, supplier_id=None):
        if supplier_id is not None:
            step = SupplierData.query.get(supplier_id)
            return jsonify(step.serialize())
        else:
            return jsonify(SupplierData.serialize_list(SupplierData.query.order_by(SupplierData.name.asc()).all()))

    @protected_resource('EDIT_JOURNEYS')
    def post(self):
        supplier = SupplierData(parser.parse_args())
        db.session.add(supplier)
        db.session.commit()
        return jsonify(supplier.serialize())

    @protected_resource('EDIT_JOURNEYS')
    def put(self, supplier_id):
        altered_data = RequestResource.put(supplier_id, SupplierData, parser.parse_args())
        db.session.commit()
        return jsonify(altered_data.serialize())

    @protected_resource('EDIT_JOURNEYS')
    def delete(self, supplier_id):
        return RequestResource.delete(supplier_id, SupplierData)
