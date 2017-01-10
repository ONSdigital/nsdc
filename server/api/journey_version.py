from flask import jsonify
from flask_restful import Resource
from protected_resource import protected_resource
from data.journey_version import JourneyVersionData


class JourneyVersion(Resource):
    @protected_resource('VIEW_JOURNEY')
    def get(self, supplier_id, journey_id):
        versions = JourneyVersionData.query.filter(
            JourneyVersionData.journey_id == journey_id,
            JourneyVersionData.supplier_id == supplier_id
        )
        return jsonify(JourneyVersionData.serialize_list(versions))
