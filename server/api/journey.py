from config import db
from flask import jsonify
from flask_restful import reqparse, Resource
from protected_resource import protected_resource
from data.journey import JourneyData

parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('description')


class Journey(Resource):
    @protected_resource('VIEW_JOURNEYS')
    def get(self, journey_id=None):
        if journey_id is not None:
            journey = JourneyData.query.get(journey_id)
            return jsonify(journey.serialize())

        return jsonify(JourneyData.serialize_list(JourneyData.query.all()))

    @protected_resource('ADD_JOURNEYS')
    def post(self):
        request_json = parser.parse_args()
        journey = JourneyData(
            request_json['name'],
            request_json['description']
        )

        db.session.add(journey)
        db.session.commit()
        return jsonify(journey.serialize())

    @protected_resource('EDIT_JOURNEYS')
    def put(self, journey_id):
        journey = JourneyData.query.get(journey_id)
        request_json = parser.parse_args()

        if request_json['name'] is not None:
            journey.name = request_json['name']
        if request_json['description'] is not None:
            journey.description = request_json['description']

        db.session.commit()
        return jsonify(journey.serialize())

    @protected_resource('DELETE_JOURNEYS')
    def delete(self, journey_id):
        JourneyData.query.filter_by(id=journey_id).delete()
        db.session.commit()
        return '', 204
