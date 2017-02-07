# NSDC Alpha

## Client

To run the client, there are some requirements to your system, that you will need to install:

* nodejs

Once this has been installed, run the following commands:

* `npm install`
* `npm start`

To run in prod `npm run start:prod` then navigate to localhost:8080


Navigate to a browser and the application will be served on `localhost:3000`

To run the prod build and create the bundle you will need to run `npm run build:prod`

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

You could run the setup sql commands on cmd using `psql -d nsdc -U postgres -f file_name_here.sql`

Now you can run the server using the following command:

* `python server.py`


## MoveIt

The current process requires a file watcher to be present in order to trigger an upload to MoveIt.

Prerequisites:

* WinSCP

To set this up locally, you'll need to do the following:

* Copy watchServiceDB.py from /scripts/ to a local directory, e.g. C:\scripts
* Acquire the two files (uploadFileToRemote & uploadToMoveIt) from the relevant people on the project, and put them into the same directory.

Next you will need to generate an ssh-key in order to upload.  You can do this using PuttyGen, and once you have a key:

* Open uploadFileToRemove and add it after `-hostkey=`
* Open watchService.py and make sure the credentials to the Postgres DB are correct.
* Open uploadToMoveIt.bat and make sure:
** The path to WinSCP is correct
** The path to be able to create a log exists (e.g. C:\temps)

Now you will need to run the watchServiceDB.py within the command prompt.

`python watchServiceDB.py C:\dev\temp\`

To prove that both default and secure types are valid, you'll need to have two watchers running to both folders.

If you trigger a file upload through the UI, it should now upload to MoveIt.

### Notes

If you are updating the schema, you will need to update remove the migrations folder.
When handling multiple migrations, you may need to run the following command within Postgres Admin:

* DROP TABLE alembic_version;

#### Password Salting

For the alpha, the passwords are **NOT** encrypted in the Database.  The majority of this code is stub to prove the concept
and looking further into the future, will eventually connect to the internal Active Directory/LDAP.
