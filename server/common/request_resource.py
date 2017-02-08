from config import db
from flask import abort
from sqlalchemy import exc


class RequestResource:
    @staticmethod
    def put(resource_id, data, args):
        data_items = data.query.get(resource_id)

        for arg in args:
            if args[arg] is not None:
                setattr(data_items, arg, args[arg])

        return data_items

    @staticmethod
    def delete(resource_id, data):
        try:
            data.query.filter_by(id=resource_id).delete()
            db.session.commit()
        except exc.IntegrityError:
            abort(409, 'This resource is being used. Failed to delete.')
        return '', 204
