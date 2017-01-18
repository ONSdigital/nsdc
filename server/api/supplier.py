from config import db
from flask import jsonify
from flask_restful import reqparse, Resource
from protected_resource import protected_resource
from data.supplier import SupplierData

parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('description')


class Supplier(Resource):
    @protected_resource('VIEW_SUPPLIERS')
    def get(self, supplier_id=None):

        if supplier_id is not None:
            step = SupplierData.query.get(supplier_id)
            return jsonify(step.serialize())
        else:
            return jsonify(SupplierData.serialize_list(SupplierData.query.order_by(SupplierData.name.asc()).all()))

    @protected_resource('ADD_SUPPLIERS')
    def post(self):
        request_json = parser.parse_args()
        supplier = SupplierData(
            request_json['name'],
            request_json['description']
        )

        db.session.add(supplier)
        db.session.commit()
        return jsonify(supplier.serialize())

    @protected_resource('EDIT_SUPPLIERS')
    def put(self, supplier_id):
        supplier = SupplierData.query.get(supplier_id)
        request_json = parser.parse_args()

        if request_json['name'] is not None:
            supplier.name = request_json['name']
        if request_json['description'] is not None:
            supplier.description = request_json['description']

        db.session.commit()
        return jsonify(supplier.serialize())

    @protected_resource('DELETE_SUPPLIERS')
    def delete(self, supplier_id):
        SupplierData.query.filter_by(id=supplier_id).delete()
        db.session.commit()
        return '', 204
