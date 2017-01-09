import os
from flask import jsonify, abort, request
from flask_restful import reqparse, Resource
from werkzeug.utils import secure_filename
from config import app


class FileUpload(Resource):
    def post(self):
        # check if the post request has the file part
        if 'file' not in request.files:
            return abort(400, 'No file uploaded')
        file = request.files['file']

        if file.filename == '':
            return abort(400, 'Invalid filename')
        if file:
            filename = secure_filename(file.filename)
            try:
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            except IOError:
                return abort(400, 'Could not write file to folder')
            return jsonify(filename)
