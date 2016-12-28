from flask import jsonify
from flask_restful import Resource

from common.serializer import Serializer
from data.journey import JourneyData


class Journey(Resource, Serializer):
    def get(self, supplier_id=None):
        if supplier_id is not None:
            journeys = JourneyData.query.filter(JourneyData.supplier_id == supplier_id)
        else:
            journeys = JourneyData.query.all()

        return jsonify(JourneyData.serialize_list(journeys))