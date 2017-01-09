import os
from flask import jsonify, abort, request
from flask_restful import Resource
from protected_resource import protected_resource
from werkzeug.utils import secure_filename
from config import app


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
            except IOError:
                return abort(400, 'Could not write file to folder')

            return jsonify(filename)
