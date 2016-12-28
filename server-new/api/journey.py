from flask import jsonify
from authenticated_resource import AuthenticatedResource

from common.serializer import Serializer
from data.journey import JourneyData


class Journey(AuthenticatedResource, Serializer):
    def get(self, supplier_id=None):
        if supplier_id is not None:
            journeys = JourneyData.query.filter(JourneyData.supplier_id == supplier_id)
        else:
            journeys = JourneyData.query.all()

        return jsonify(JourneyData.serialize_list(journeys))
        