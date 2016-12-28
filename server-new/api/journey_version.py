from flask import jsonify
from flask_restful import Resource

from common.serializer import Serializer
from data.journey_version import JourneyVersionData


class JourneyVersion(Resource, Serializer):
    def get(self, supplier_id, journey_id):
        versions = JourneyVersionData.query.filter(
            JourneyVersionData.supplier_id == supplier_id and JourneyVersionData.journey_id == journey_id
        )
        return jsonify(JourneyVersionData.serialize_list(versions))