from flask import jsonify
from flask_restful import Resource
from protected_resource import protected_resource
from data.journey import JourneyData


class Journey(Resource):
    @protected_resource('VIEW_JOURNEYS')
    def get(self):
        return jsonify(JourneyData.serialize_list(JourneyData.query.all()))
