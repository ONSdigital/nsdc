from flask import jsonify, request
from protected_resource import protected_resource
from flask_restful import Resource
from data.journey_version import JourneyVersionData
from data.journey import JourneyData
from data.schedule import ScheduleData


class JourneyVersionSchedule(Resource):
    def get(self, journey_version_id):
        if request.args and request.args['with-version'] == 'true':
            return self.get_with_version(journey_version_id)
        schedules = ScheduleData.query.filter(journey_version_id == ScheduleData.journey_version_id)\
            .order_by(ScheduleData.date.asc())
        return jsonify(ScheduleData.serialize_list(schedules))

    def get_with_version(self, journey_version_id):
        journey_version = JourneyVersionData.query.get(journey_version_id)
        journey_version_schedule = ScheduleData.query.filter(journey_version_id == ScheduleData.journey_version_id)\
            .filter(ScheduleData.status == 'pending').order_by(ScheduleData.date.asc()).first()
        if journey_version_schedule is None:
            return None
        journey = JourneyData.query.get(journey_version.journey_id)
        return jsonify({
            'id': journey_version.id,
            'version_number': journey_version.version_number,
            'schedule_id': journey_version_schedule.id,
            'date': journey_version_schedule.date,
            'name': journey.name,
            'validator': journey_version.validator,
            'extensions': journey_version.extensions
        })
