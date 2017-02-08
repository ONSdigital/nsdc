class RequestResource:
    @staticmethod
    def put(id, data, args):
        data_items = data.query.get(id)

        for arg in args:
            if args[arg] is not None:
                setattr(data_items, arg, args[arg])

        return data_items
