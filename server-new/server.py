from flask_restful import Api

from config import app

from api.role import Role
from api.supplier import Supplier
from api.journey import Journey
from api.journey_version import JourneyVersion

base_endpoint = '/nsdc/v1.0/'

api = Api(app)

api.add_resource(
    Role,
    base_endpoint + 'roles',
    base_endpoint + 'roles/<role_id>'
)
api.add_resource(
    Supplier,
    base_endpoint + 'suppliers'
)
api.add_resource(
    Journey,
    base_endpoint + 'journeys',
    base_endpoint + 'journeys/supplier/<supplier_id>'
)
api.add_resource(
    JourneyVersion,
    base_endpoint + 'journeys/versions/<supplier_id>/<journey_id>'
)

if __name__ == '__main__':
    app.run(debug=True)
