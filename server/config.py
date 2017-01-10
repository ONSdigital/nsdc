from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# change this to the place where files will be stored
UPLOAD_FOLDER = '/ssavery/temp'

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:password@localhost:5432/nsdc"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SECRET_KEY'] = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
app.config['BUNDLE_ERRORS'] = True
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

cors = CORS(app)

db = SQLAlchemy(app)
