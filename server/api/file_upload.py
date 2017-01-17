import os
import re
from flask import jsonify, abort, request
from flask_restful import Resource
from protected_resource import protected_resource
from werkzeug.utils import secure_filename
from config import app
from data.file import FileData
from data.file_journey_audit import FileJourneyAuditData
from data.journey import JourneyData
from config import db


def write_file_status(filename, status, description, journey_id):
    db.session.add(FileData(filename, journey_id))
    db.session.add(FileJourneyAuditData("UPLOAD_TO_SERVER", filename, status, description))
    db.session.commit()


def validate_filename(filename, validator):
    # add start and end to regex and replace * with .*
    validator_regex = '^' + validator.replace('*', '.*') + '$'
    match_found = re.match(validator_regex, filename)
    return match_found is not None


class FileUpload(Resource):
    @protected_resource('DATA_IMPORT')
    def post(self):
        if 'file' not in request.files:
            abort(400, 'No file uploaded')
        uploaded_file = request.files['file']

        if uploaded_file.filename == '':
            abort(400, 'Invalid filename')

        filename = secure_filename(uploaded_file.filename)

        journeys = JourneyData.query.all()
        journey = next((journey for journey in journeys if validate_filename(filename, journey.validator)), None)

        if journey is None:
            abort(400, 'File has no journey')
        journey_id = journey.id

        file_exists = FileJourneyAuditData.query \
            .filter(FileJourneyAuditData.filename == filename, FileJourneyAuditData.status == 'success').count() > 0

        if file_exists:
            error_message = 'File with same name exists'
            write_file_status(filename, 'error', error_message, journey_id)
            abort(400, error_message)

        try:
            uploaded_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        except IOError:
            error_message = 'Could not write file to folder'
            write_file_status(filename, 'error', error_message, journey_id)
            abort(400, error_message)
        write_file_status(filename, 'success', 'Uploaded to server', journey_id)
        return jsonify(filename)
