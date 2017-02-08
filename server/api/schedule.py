from config import db
from flask import jsonify
from flask_restful import reqparse, Resource
from protected_resource import protected_resource
from data.schedule import ScheduleData
from common.request_resource import RequestResource


parser = reqparse.RequestParser()
parser.add_argument('date')
parser.add_argument('status')
parser.add_argument('journey_version_id')


class Schedule(Resource):

    def get(self, schedule_id):
        schedule = ScheduleData.query.get(schedule_id)
        return jsonify(schedule.serialize())

    @protected_resource('EDIT_JOURNEYS')
    def post(self):
        request = parser.parse_args()
        schedule = ScheduleData(
            date=request['date'],
            status=request['status'],
            journey_version_id=request['journey_version_id']
        )

        db.session.add(schedule)
        db.session.commit()
        return jsonify(schedule.serialize())

    @protected_resource('EDIT_JOURNEYS')
    def put(self, schedule_id):
        altered_data = RequestResource.put(schedule_id, ScheduleData, parser.parse_args())
        db.session.commit()
        return jsonify(altered_data.serialize())

    @protected_resource('DELETE_JOURNEYS')
    def delete(self, schedule_id):
        ScheduleData.query.filter_by(id=schedule_id).delete()
        db.session.commit()
        return '', 204
