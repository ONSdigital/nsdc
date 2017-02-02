from config import db
from common.serializer import Serializer


class FileJourneyAuditChartData(db.Model, Serializer):
    __tablename__ = 'file_journey_audit_chart'
    id = db.Column('id', db.Integer, primary_key=True)
    filename = db.Column('filename', db.String(50), nullable=False, server_default=u'')
    processed = db.Column('processed', db.Integer, nullable=False)
    error = db.Column('error', db.Integer, nullable=False)

    def __init__(self, filename, processed, error):
        self.filename = filename
        self.processed = processed,
        self.error = error

    def serialize(self):
        return {
            'filename': self.filename,
            'processed': self.processed,
            'error': self.error
        }
