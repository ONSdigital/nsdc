from config import db

journey_version_role = db.Table('journey_version_role',
    db.Column('journey_version_id', db.Integer, db.ForeignKey('journey_version.journey_version_id'), nullable=False),
    db.Column('role_id', db.Integer, db.ForeignKey('role.role_id'), nullable=False),
    db.PrimaryKeyConstraint('journey_version_id', 'role_id')
)
