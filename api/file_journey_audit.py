from flask import jsonify
from flask_restful import Resource
from protected_resource import protected_resource
from data.file_journey_audit import FileJourneyAuditData
from data.file import FileData


class FileJourneyAudit(Resource):
    @protected_resource('DATA_AUDIT')
    def get(self, id):
        file_result = FileData.query.get(id)
        return jsonify(FileJourneyAuditData.serialize_list(
            FileJourneyAuditData.query.filter(FileJourneyAuditData.filename == file_result.name).all())
        )
