from config import db
from flask import jsonify, request
from protected_resource import protected_resource
from flask_restful import Resource
from data.journey_version import JourneyVersionData
from data.journey_step import JourneyStepData


class JourneyVersionStep(Resource):

    @protected_resource('VIEW_JOURNEYS')
    def post(self, journey_version_id):
        journey_version = JourneyVersionData.query.get(journey_version_id)
        step_ids = request.json['steps']
        steps = JourneyStepData.query.filter(JourneyStepData.id.in_(step_ids)).all()
        journey_version.journey_steps = steps
        db.session.commit()
        return jsonify(JourneyStepData.serialize_list(journey_version.journey_steps))
