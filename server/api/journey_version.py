from flask import jsonify
from flask_restful import Resource
from protected_resource import protected_resource
from data.journey_version import JourneyVersionData


class JourneyVersion(Resource):
    @protected_resource('VIEW_JOURNEYS')
    def get(self, journey_id=None):

        if journey_id is not None:
            journey_versions = JourneyVersionData.query.filter(JourneyVersionData.journey_id == journey_id)
        else:
            journey_versions = JourneyVersionData.query

        return jsonify(JourneyVersionData.serialize_list(journey_versions.all()))
