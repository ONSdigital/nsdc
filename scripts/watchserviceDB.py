import time
import sys, os
import psycopg2
from subprocess import *
from watchdog.observers import Observer  
from watchdog.events import PatternMatchingEventHandler 

# pip install watchdog
# python watchserviceDB.py <watch folder>

def db_entry(starttime, endtime, step, filename, status, description):
    connection = psycopg2.connect(database="nsdc", user="postgres", password="password", host="localhost", port="5432")
    print "Opened database successfully"
    create_db = connection.cursor()
    create_db.execute('''CREATE TABLE IF NOT EXISTS file_journey_audit
    (id SERIAL PRIMARY KEY  NOT NULL,
    start_time VARCHAR(1000)  NOT NULL,
    end_time VARCHAR(1000) NOT NULL,
    step VARCHAR(1000),
    filename  VARCHAR(1000),
    status VARCHAR(1000),
    description VARCHAR(1000)
    )''')
    connection.commit()
    insert_db = connection.cursor()
    insert_db.execute('''INSERT INTO file_journey_audit (start_time, end_time, step, filename, status, description) \
        VALUES (%s, %s, %s, %s, %s, %s )''', (starttime, endtime, step, filename, status, description))
    connection.commit()
    print "Records entered successfully : (StartTime: %s, EndTime: %s, Step: %s, FileName: %s , Status: %s, description: %s) " % (starttime, endtime, step, filename, status, description)
    connection.close()

class MyHandler(PatternMatchingEventHandler):
    patterns = ["*.txt", "*.xml"]

    def process(self, event):
        """
        event.event_type 
            'modified' | 'created' | 'moved' | 'deleted'
        event.is_directory
            True | False
        event.src_path
            path/to/observed/file
        """
        # the file will be processed there
        print event.src_path, event.event_type  # print now only for degug
        #############################################
        # Insert code to upload data to MoveIt server
        #############################################
        starttime = time.asctime(time.localtime(time.time()))
        p = Popen("uploadToMoveItServer.bat " + event.src_path)
        stdout, stderr = p.communicate() 
        endtime = time.asctime(time.localtime(time.time()))
        description = "Uploaded to move it server"
        status = "Accepted"
        step = 'UPLOAD TO MOVEIT'
        db_entry(starttime, endtime, step, event.src_path, status, description)
        print "move it ops finished..."
        ######################################
        # Insert code to insert into database.
        ######################################

    # def on_modified(self, event):
    #     self.process(event)

    def on_created(self, event):
        self.process(event)



if __name__ == '__main__':
    args = sys.argv[1:]
    observer = Observer()
    observer.schedule(MyHandler(), path=args[0] if args else '.')
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()    