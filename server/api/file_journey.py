from flask import jsonify
from flask_restful import Resource
from protected_resource import protected_resource
from data.file import FileData


class FileJourney(Resource):
    @protected_resource('DATA_AUDIT')
    def get(self, id):
        return jsonify(
            FileData.serialize_list(
                FileData.query.filter(FileData.journey_id == id).distinct(FileData.name).all()
            )
        )
