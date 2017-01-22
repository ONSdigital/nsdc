from flask_restful import Api

from config import app
from api.journey import Journey
from api.login import Login
from api.role import Role
from api.role_permission import RolePermission
from api.file_upload import FileUpload
from api.permission import Permission
from api.user import User
from api.self import Self
from api.self_permission import SelfPermissions
from api.file import File
from api.file_journey_audit import FileJourneyAudit
from api.journey_version_step import JourneyVersionStep
from api.journey_step import JourneyStep
from api.supplier import Supplier
from api.schedule import Schedule
from api.journey_version import JourneyVersion
from api.journey_version_role import JourneyVersionRole
from api.journey_version_schedule import JourneyVersionSchedule

base_endpoint = '/nsdc/v1.0/'

api = Api(app)

api.add_resource(
    User,
    base_endpoint + 'users',
    base_endpoint + 'users/<user_id>',
    base_endpoint + 'users/role/<role_id>',
)

api.add_resource(
    Permission,
    base_endpoint + 'permissions',
    base_endpoint + 'permissions/<permission_id>',
    base_endpoint + 'permissions/role/<role_id>',
    base_endpoint + 'permissions/user/<user_id>'
)

api.add_resource(
    RolePermission,
    base_endpoint + 'roles/<role_id>/permissions'
)

api.add_resource(
    JourneyVersionRole,
    base_endpoint + 'journeys/versions/roles/<role_id>'
)

api.add_resource(
    Role,
    base_endpoint + 'roles',
    base_endpoint + 'roles/<role_id>'
)

api.add_resource(
    Journey,
    base_endpoint + 'journeys',
    base_endpoint + 'journeys/<journey_id>'
)

api.add_resource(
    JourneyVersion,
    base_endpoint + 'journeys/versions',
    base_endpoint + 'journeys/versions/<journey_version_id>',
    base_endpoint + 'journeys/<journey_id>/versions'
)

api.add_resource(
    JourneyStep,
    base_endpoint + 'journeys/steps',
    base_endpoint + 'journeys/versions/<journey_version_id>/steps'
)

api.add_resource(
    JourneyVersionStep,
    base_endpoint + 'journeys/versions/<journey_version_id>/updatesteps'
)

api.add_resource(
    JourneyVersionSchedule,
    base_endpoint + 'journeys/versions/<journey_version_id>/schedules/with-version'
)

api.add_resource(
    Schedule,
    base_endpoint + 'journeys/versions/<journey_version_id>/schedules'
)

api.add_resource(
    Supplier,
    base_endpoint + 'suppliers',
    base_endpoint + 'suppliers/<supplier_id>'
)

api.add_resource(
    Self,
    base_endpoint + 'self'
)

api.add_resource(
    SelfPermissions,
    base_endpoint + 'self/permissions'
)

api.add_resource(
    Login,
    base_endpoint + 'login'
)

api.add_resource(
    File,
    base_endpoint + 'files'
)

api.add_resource(
    FileJourneyAudit,
    base_endpoint + 'files/audit/<id>'
)

api.add_resource(
    FileUpload,
    base_endpoint + 'upload'
)

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
