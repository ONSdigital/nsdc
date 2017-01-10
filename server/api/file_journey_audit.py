from flask import jsonify
from authenticated_resource import AuthenticatedResource

from common.serializer import Serializer
from data.file_journey_audit import FileJourneyAuditData


class FileJourneyAudit(AuthenticatedResource, Serializer):
    def get(self, name):
        return jsonify(FileJourneyAuditData.serialize_list(
            FileJourneyAuditData.query.filter(FileJourneyAuditData.filename == name).all())
        )
