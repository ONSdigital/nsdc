from flask import jsonify
from protected_resource import ProtectedResource

from common.serializer import Serializer
from data.role import RoleData

# all role endpoints are protected by the permission short name 'TEST_PERM'
# will modify later e.g. to apply to only get endpoints
class Role(ProtectedResource('TEST_PERM'), Serializer):
    def get(self, role_id=None):
        if role_id is not None:
            role = RoleData.query.get(role_id).serialize()
            return jsonify(role)
        else:
            return jsonify(RoleData.serialize_list(RoleData.query.all()))

