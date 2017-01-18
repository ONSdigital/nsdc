from flask import jsonify
from flask_restful import Resource
from protected_resource import protected_resource
from data.journey_step import JourneyStepData
from data.journey import JourneyData
from data.user import UserData


class JourneyStep(Resource):
    @protected_resource('VIEW_JOURNEYS')
    def get(self, journey_id=None, user_id=None, step_id=None):

        if step_id is not None:
            step = JourneyStepData.query.get(step_id)
            return jsonify(step.serialize())

        if journey_id is not None:
            steps = JourneyData.query.get(journey_id).steps
        elif user_id is not None:
            steps = JourneyData.query.get(UserData.query.get(user_id).role_id).steps
        else:
            steps = JourneyStepData.query

        return jsonify(JourneyStepData.serialize_list(steps.order_by(JourneyStepData.name.asc()).all()))
