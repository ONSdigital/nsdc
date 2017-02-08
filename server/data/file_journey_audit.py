from config import db
from common.serializer import Serializer


class FileJourneyAuditData(db.Model, Serializer):
    __tablename__ = 'file_journey_audit'
    id = db.Column('id', db.Integer, primary_key=True)
    step = db.Column('step', db.String(50), nullable=False, server_default=u'')
    filename = db.Column('filename', db.String(50), nullable=False, server_default=u'')
    status = db.Column('status', db.String(10), nullable=False, server_default=u'')
    description = db.Column('description', db.String(150), nullable=False, server_default=u'')
    start_time = db.Column('start_time', db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)
    end_time = db.Column('end_time', db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)

    def __init__(self, step, filename, status, description):
        self.step = step
        self.filename = filename,
        self.status = status,
        self.description = description

