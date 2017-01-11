import os
from flask import jsonify, abort, request
from flask_restful import Resource
from protected_resource import protected_resource
from werkzeug.utils import secure_filename
from config import app
from data.file import FileData
from data.file_journey_audit import FileJourneyAuditData
from config import db



def write_file_status(filename, status, description):
    db.session.add(FileData(filename))
    db.session.add(FileJourneyAuditData("UPLOAD_TO_SERVER", filename, status, description))
    db.session.commit()


class FileUpload(Resource):
    @protected_resource('DATA_IMPORT')
    def post(self):
        # check if the post request has the file part
        if 'file' not in request.files:
            return abort(400, 'No file uploaded')
        uploaded_file = request.files['file']

        if uploaded_file.filename == '':
            error_message = 'Invalid filename'
            return abort(400, error_message)

        filename = secure_filename(uploaded_file.filename)
        file_exists = FileJourneyAuditData.query\
            .filter(FileJourneyAuditData.filename == filename, FileJourneyAuditData.status == 'success').count() > 0

        if file_exists:
            error_message = 'File with same name exists'
            write_file_status(filename, 'error', error_message)
            abort(400, error_message)
        else:
            try:
                uploaded_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            except IOError:
                error_message = 'Could not write file to folder'
                write_file_status(filename, 'error', error_message)
                return abort(400, error_message)
        write_file_status(filename, 'success', 'Uploaded to server')
        return jsonify(filename)
