from config import db
from flask import jsonify
from flask_restful import reqparse, Resource
from protected_resource import protected_resource
from data.journey import JourneyData

parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('description')
parser.add_argument('validator')


class Journey(Resource):
    @protected_resource('VIEW_JOURNEYS')
    def get(self):
        return jsonify(JourneyData.serialize_list(JourneyData.query.all()))

    @protected_resource('ADD_JOURNEYS')
    def post(self):
        request_json = parser.parse_args()
        journey = JourneyData(
            request_json['name'],
            request_json['description'],
            request_json['validator']
        )

        db.session.add(journey)
        db.session.commit()
        return jsonify(journey.serialize())
