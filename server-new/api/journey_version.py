from flask import jsonify
from authenticated_resource import AuthenticatedResource

from common.serializer import Serializer
from data.journey_version import JourneyVersionData


class JourneyVersion(AuthenticatedResource, Serializer):
    def get(self, supplier_id, journey_id):
        versions = JourneyVersionData.query.filter(
            JourneyVersionData.journey_id == journey_id and
            JourneyVersionData.supplier_id == supplier_id
        )
        return jsonify(JourneyVersionData.serialize_list(versions))
