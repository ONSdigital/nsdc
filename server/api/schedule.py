from flask import jsonify, request
from flask_restful import Resource
from protected_resource import protected_resource
from data.schedule import ScheduleData


class Schedule(Resource):

    @protected_resource('VIEW_JOURNEYS')
    def get(self, journey_version_id):
        schedules = ScheduleData.query.filter(journey_version_id == ScheduleData.journey_version_id)
        return jsonify(ScheduleData.serialize_list(schedules))
