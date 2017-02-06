from config import db
from flask import jsonify
from flask_restful import Resource
from protected_resource import protected_resource
from data.file import FileData
from data.schedule import ScheduleData
from data.journey_version import JourneyVersionData
from data.journey import JourneyData


class FileSupplier(Resource):
    @protected_resource('DATA_AUDIT')
    def get(self, supplier_id):
        all_files = FileData.query.distinct(FileData.name)
        files_for_supplier = all_files.join(ScheduleData)\
            .join(JourneyVersionData)\
            .join(JourneyData)\
            .filter(JourneyData.supplier_id == supplier_id).all()

        return jsonify(FileData.serialize_list(files_for_supplier))
