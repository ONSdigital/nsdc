import time
import sys, os
import psycopg2

from subprocess import *
from watchdog.observers import Observer  
from watchdog.events import PatternMatchingEventHandler


def db_entry(start_time, end_time, step, filename, status, description):
    connection = psycopg2.connect(database="nsdc", user="postgres", password="password", host="localhost", port="5432")
    print "Opened database successfully"
    connection.commit()
    insert_db = connection.cursor()
    insert_db.execute('''INSERT INTO file_journey_audit (start_time, end_time, step, filename, status, description) \
        VALUES (%s, %s, %s, %s, %s, %s )''', (start_time, end_time, step, filename, status, description))
    connection.commit()
    print 'Audit entry added for ' + filename
    connection.close()


class MyHandler(PatternMatchingEventHandler):
    patterns = ["*.txt", "*.xml"]

    def process(self, event):
        # Upload file to MoveIt server
        starttime = time.asctime(time.localtime(time.time()))
        p = Popen("uploadToMoveItServer.bat " + event.src_path)
        stdout, stderr = p.communicate() 
        endtime = time.asctime(time.localtime(time.time()))
        # Insert Audit Log to Database
        db_entry(starttime, endtime, 'UPLOAD_TO_MOVEIT',
                 event.src_path.replace(sys.argv[1:][0], ''), 'success', 'Uploaded to move it server')

        print "Move It Ops Finished"

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