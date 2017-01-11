from flask import jsonify
from flask_restful import Resource
from protected_resource import protected_resource
from data.file import FileData


class File(Resource):
    @protected_resource('DATA_AUDIT')
    def get(self):
        return jsonify(FileData.serialize_list(FileData.query.distinct(FileData.name).all()))
