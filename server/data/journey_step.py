from config import db

journey_step = db.Table('journey_step',
    db.Column('journey_id', db.Integer, db.ForeignKey('journey.journey_id'), nullable=False),
    db.Column('step_id', db.Integer, db.ForeignKey('step.step_id'), nullable=False),
    db.PrimaryKeyConstraint('journey_id', 'step_id')
)
