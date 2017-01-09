from flask import jsonify
from authenticated_resource import AuthenticatedResource

from common.serializer import Serializer
from data.journey_steps import JourneyStepData


class JourneyStep(AuthenticatedResource, Serializer):
    def get(self):
        return jsonify(JourneyStepData.serialize_list(JourneyStepData.query.all()))
