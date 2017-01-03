from config import db

role_permission = db.Table('role_permission',
    db.Column('role_id', db.Integer, db.ForeignKey('role.role_id'), nullable=False),
    db.Column('permission_id', db.Integer, db.ForeignKey('permission.permission_id'), nullable=False),
    db.PrimaryKeyConstraint('role_id', 'permission_id')
)
