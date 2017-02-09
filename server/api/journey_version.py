from config import db
from flask import jsonify
from flask_restful import reqparse, Resource
from protected_resource import protected_resource
from data.journey_version import JourneyVersionData
from common.request_resource import RequestResource

parser = reqparse.RequestParser()
parser.add_argument('journey_id')
parser.add_argument('version_number')
parser.add_argument('validator')
parser.add_argument('extensions')
parser.add_argument('protocol')


class JourneyVersion(Resource):
    @protected_resource('VIEW_JOURNEYS')
    def get(self, journey_id=None, journey_version_id=None):
        if journey_version_id is not None:
            journey = JourneyVersionData.query.get(journey_version_id)
            return jsonify(journey.serialize())

        if journey_id is not None:
            journey_versions = JourneyVersionData.query.filter(JourneyVersionData.journey_id == journey_id)
        else:
            journey_versions = JourneyVersionData.query

        return jsonify(JourneyVersionData.serialize_list(journey_versions.all()))

    @protected_resource('ADD_JOURNEYS')
    def post(self):
        journey_version = JourneyVersionData(parser.parse_args())
        db.session.add(journey_version)
        db.session.commit()
        return jsonify(journey_version.serialize())

    @protected_resource('EDIT_JOURNEYS')
    def put(self, journey_version_id):
        altered_data = RequestResource.put(journey_version_id, JourneyVersionData, parser.parse_args())
        db.session.commit()
        return jsonify(altered_data.serialize())

    @protected_resource('DELETE_JOURNEYS')
    def delete(self, journey_version_id):
        return RequestResource.delete(journey_version_id, JourneyVersionData)
