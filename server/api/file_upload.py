import os
from flask import jsonify, abort, request
from flask_restful import Resource
from protected_resource import protected_resource
from werkzeug.utils import secure_filename
from config import app
from data.file import FileData
from data.file_journey_audit import FileJourneyAuditData
from config import db


def audit_details(status, error_msg):
    return {
        'status': 'error' if status else 'success',
        'description': error_msg if status else '-'
    }

class FileUpload(Resource):
    @protected_resource('DATA_IMPORT')
    def post(self):
        # check if the post request has the file part
        if 'file' not in request.files:
            return abort(400, 'No file uploaded')
        uploaded_file = request.files['file']

        if uploaded_file.filename == '':
            return abort(400, 'Invalid filename')
        if uploaded_file:
            filename = secure_filename(uploaded_file.filename)
            try:
                uploaded_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                file_exists = FileData.query.filter(FileData.name == filename).count() > 0
                details = audit_details(file_exists, 'File with same name exists')
                # Save uploaded filename to database
                db.session.add(FileData(filename))
                db.session.add(FileJourneyAuditData("UPLOAD", filename, details['status'], details['description']))
                db.session.commit()
                if file_exists:
                    abort(400, details['description'])
                else:
                    uploaded_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            except IOError:
                # could not write to folder
                return abort(400, 'Could not write file to folder')

            return jsonify(filename)
