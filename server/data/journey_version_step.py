from config import db

journey_version_step = db.Table('journey_version_step',
    db.Column('journey_version_id', db.Integer, db.ForeignKey('journey_version.journey_version_id'), nullable=False),
    db.Column('journey_step_id', db.Integer, db.ForeignKey('journey_step.journey_step_id'), nullable=False),
    db.PrimaryKeyConstraint('journey_version_id', 'journey_step_id')
)
