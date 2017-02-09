class CommonData(object):
    def __init__(self, args):
        for arg in args:
            setattr(self, arg, args[arg])
