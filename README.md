# NSDC Alpha

## Client

To run the client, there are some requirements to your system, that you will need to install:

* nodejs

Once this has been installed, run the following commands:

* `npm install`
* `npm start`

Navigate to a browser and the application will be served on localhost:8080

## Server

To run the server, there are some basic requirements.  You will need to install:

* Python 2.7 (not 3)
* Install Pip (this is required to get the dependencies)
* Postgres 9.4.10

Once each of these has been done, navigate to the server folder in a terminal and run the following to install dependencies:

* `pip install -r requirements.txt`


For creating the Tables and Columns in Postgres run following commands:

* `python manage.py db init`
* `python manage.py db migrate`
* `python manage.py db upgrade`

To add support to postgres for UUID generation we need to add an extension

Run this sql against your db

`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`

You will not be able to use the UI unless you have appropriate users/roles and permissions in your database.
There are sample users for each role/permission in the following script.  Running this will seed your database accordingly

`sql\sample_data.sql`

Now you can run the server using the following command:

* `python server.py`

### Notes

If you are updating the schema, you will need to update remove the migrations folder.
When handing multiple migrations, you may need to run the following command within Postgres Admin:

* DROP TABLE alembic_version;
