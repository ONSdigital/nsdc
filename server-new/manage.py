from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from config import db
from server import app

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

if __name__ == "__main__":
	manager.run()
