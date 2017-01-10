from flask import jsonify
from authenticated_resource import AuthenticatedResource

from common.serializer import Serializer
from data.file import FileData


class File(AuthenticatedResource, Serializer):
    def get(self):
        return jsonify(FileData.serialize_list(FileData.query.distinct(FileData.name).all()))
