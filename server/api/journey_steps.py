from flask import jsonify
from flask_restful import Resource
from protected_resource import protected_resource
from data.journey_steps import JourneyStepData


class JourneyStep(Resource):
    @protected_resource('VIEW_JOURNEY')
    def get(self):
        return jsonify(JourneyStepData.serialize_list(JourneyStepData.query.all()))
