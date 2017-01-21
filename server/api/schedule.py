from flask import jsonify, request
from flask_restful import Resource
from protected_resource import protected_resource
from data.schedule import ScheduleData


class Schedule(Resource):

    @protected_resource('VIEW_JOURNEYS')
    def get(self, journey_version_id):
        schedules = ScheduleData.query.filter(journey_version_id == ScheduleData.journey_version_id)
        valid_only = request.args.get('validOnly')
        if valid_only == 'true':
            schedule = schedules.filter(ScheduleData.status == 'pending').order_by(ScheduleData.date.asc()).first()
            if schedule is None:
                return ''
            return jsonify(schedule.serialize())
        return jsonify(ScheduleData.serialize_list(schedules))
