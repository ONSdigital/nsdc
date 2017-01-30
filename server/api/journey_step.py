from flask import jsonify
from flask_restful import Resource
from protected_resource import protected_resource
from data.journey_step import JourneyStepData
from data.journey_version import JourneyVersionData


class JourneyStep(Resource):
    @protected_resource('VIEW_JOURNEYS')
    def get(self, journey_version_id=None):
        if journey_version_id is not None:
            steps = JourneyVersionData.query.get(journey_version_id).journey_steps
        else:
            steps = JourneyStepData.query

        return jsonify(JourneyStepData.serialize_list(steps.order_by(JourneyStepData.id.asc()).all()))
