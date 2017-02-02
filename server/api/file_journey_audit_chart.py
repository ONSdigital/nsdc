from flask import jsonify
from flask_restful import Resource
from protected_resource import protected_resource
from data.file_journey_audit_chart import FileJourneyAuditChartData
from data.file import FileData


class FileJourneyAuditChart(Resource):
    @protected_resource('DATA_AUDIT')
    def get(self, id):
        file_result = FileData.query.get(id)
        return jsonify(FileJourneyAuditChartData.serialize_list(
            FileJourneyAuditChartData.query.filter(FileJourneyAuditChartData.filename == file_result.name).all())
        )
