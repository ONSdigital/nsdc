from flask import jsonify, request
from flask_restful import Resource
from protected_resource import protected_resource
from data.file import FileData
from data.schedule import ScheduleData
from data.journey_version import JourneyVersionData
from data.journey import JourneyData


class File(Resource):
    @protected_resource('DATA_AUDIT')
    def get(self):
        files = FileData.query.distinct(FileData.name)

        supplier_id = request.args.get('supplierId')
        to_date = request.args.get('to')
        from_date = request.args.get('from')

        if to_date is not None and to_date != '':
            files = files.filter(FileData.timestamp <= to_date)

        if from_date is not None and from_date != '':
            files = files.filter(FileData.timestamp >= from_date)

        if supplier_id is not None and supplier_id != '':
            files = files.join(ScheduleData) \
                .join(JourneyVersionData) \
                .join(JourneyData) \
                .filter(JourneyData.supplier_id == supplier_id)

        files_to_return = files.all()

        return jsonify(FileData.serialize_list(files_to_return))
