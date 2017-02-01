from config import db
from flask import jsonify, request
from protected_resource import protected_resource
from flask_restful import Resource
from data.role import RoleData
from data.journey_version import JourneyVersionData


class RoleJourneyVersion(Resource):

    @protected_resource('VIEW_ROLES')
    def post(self, role_id):
        role = RoleData.query.get(role_id)
        journey_version_ids = request.json['versions']
        journey_versions = JourneyVersionData.query.filter(JourneyVersionData.id.in_(journey_version_ids)).all()
        role.journey_versions = journey_versions
        db.session.commit()
        return jsonify(JourneyVersionData.serialize_list(role.journey_versions))
