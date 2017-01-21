from flask import jsonify
from protected_resource import protected_resource
from flask_restful import Resource
from data.role import RoleData
from data.journey_version import JourneyVersionData


class JourneyVersionRole(Resource):

    @protected_resource('VIEW_JOURNEYS')
    def get(self, role_id):
        journey_versions = RoleData.query.get(role_id).journey_versions
        return jsonify(JourneyVersionData.serialize_list(journey_versions))
