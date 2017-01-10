from flask_restful import Api

from config import app
from api.journey import Journey
from api.login import Login
from api.role import Role
from api.role_permission import RolePermission
from api.file_upload import FileUpload
from api.permission import Permission
from api.user import User
from api.journey_steps import JourneyStep
from api.self import Self
from api.self_permission import SelfPermissions

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
    Role,
    base_endpoint + 'roles',
    base_endpoint + 'roles/<role_id>'
)

api.add_resource(
    Journey,
    base_endpoint + 'journeys'
)

api.add_resource(
    JourneyStep,
    base_endpoint + 'journeys/steps'
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
    FileUpload,
    base_endpoint + 'upload'
)

if __name__ == '__main__':
    app.run(debug=True)
