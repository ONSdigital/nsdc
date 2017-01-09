"""empty message

Revision ID: bce2bda95937
Revises: 
Create Date: 2017-01-09 12:51:09.128000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bce2bda95937'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('journey_step',
    sa.Column('step_id', sa.Integer(), nullable=False),
    sa.Column('journey_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=50), server_default=u'', nullable=False),
    sa.Column('description', sa.String(length=150), server_default=u'', nullable=False),
    sa.Column('short_name', sa.String(length=20), server_default=u'', nullable=False),
    sa.ForeignKeyConstraint(['journey_id'], ['journey.journey_id'], ),
    sa.PrimaryKeyConstraint('step_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('journey_step')
    # ### end Alembic commands ###
