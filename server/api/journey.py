from flask import jsonify
from flask_restful import Resource
from protected_resource import protected_resource
from data.journey import JourneyData


class Journey(Resource):
    @protected_resource('VIEW_JOURNEY')
    def get(self, supplier_id=None):
        if supplier_id is not None:
            journeys = JourneyData.query.filter(JourneyData.supplier_id == supplier_id)
        else:
            journeys = JourneyData.query.all()

        return jsonify(JourneyData.serialize_list(journeys))
