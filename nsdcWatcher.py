import time
import sys, os
import psycopg2
from av_clamscan import *
from unpacking import *
from pre_streamsets import *

from subprocess import *
from watchdog.observers import Observer  
from watchdog.events import PatternMatchingEventHandler
import shutil

staging_area = '/home/cloudera/staging'
streamsets_area = '/home/cloudera/streamsets'
pre_streamset_file = ''
if  not os.path.exists(staging_area):
	os.mkdir(staging_area)
if  not os.path.exists(streamsets_area):
	os.mkdir(streamsets_area)	

def db_entry(start_time, end_time, step, filename, status, description):
    connection = psycopg2.connect(database="postgres", user="postgres", password="book2mno", host="192.168.1.145", port="5432")
    print "Opened database successfully"
    connection.commit()
    insert_db = connection.cursor()
    insert_db.execute('''INSERT INTO file_journey_audit (start_time, end_time, step, filename, status, description) \
        VALUES (%s, %s, %s, %s, %s, %s )''', (start_time, end_time, step, filename, status, description))
    connection.commit()
    print 'Audit entry added for ' + filename
    connection.close()


class MyHandler(PatternMatchingEventHandler):
    patterns = ['*.txt', '*.xml', '*.csv', '*.zip']

    def process(self, event):
        # Upload file to MoveIt server
        '''
        starttime = time.asctime(time.localtime(time.time()))
        p = Popen("uploadToMoveItServer.bat " + event.src_path)
        stdout, stderr = p.communicate() 
        endtime = time.asctime(time.localtime(time.time()))
        # Insert Audit Log to Database
        db_entry(starttime, endtime, 'UPLOAD_TO_MOVEIT',
                 event.src_path.replace(sys.argv[1:][0], ''), 'success', 'Uploaded to move it server')
		'''
        print "Move It Ops Finished"
        file1 = ''
        ffile2 = ''        

        # Check if download file contains virus
        starttime = time.asctime(time.localtime(time.time()))
        output = avcheck(event.src_path)
        endtime = time.asctime(time.localtime(time.time()))
        print 'RESULT = ' + output
        db_entry(starttime, endtime, 'MALWARE AND AV CHECK',
                 event.src_path.replace(sys.argv[1:][0], ''), output.replace('+', ''), 'Malware/AV check')

        if os.path.exists(event.src_path):
        	filename, extension = (os.path.splitext(event.src_path))
        	if extension != ".zip":
        		shutil.move(event.src_path, staging_area)
        		starttime = time.asctime(time.localtime(time.time()))
        		out = validate(staging_area + '/' + os.path.basename(event.src_path))
        		endtime = time.asctime(time.localtime(time.time()))
        		db_entry(starttime, endtime, 'PRE-STREAMSETS', event.src_path.replace(sys.argv[1:][0], ''), out.replace('+',''), 'Pre-streamsets validation')          		
        	else:
		        starttime = time.asctime(time.localtime(time.time()))
        		unpack_decrypt('VAT92016', staging_area, event.src_path)
		        endtime = time.asctime(time.localtime(time.time()))
        		db_entry(starttime, endtime, 'UNPACKING AND DECRYPTING', event.src_path.replace(sys.argv[1:][0], ''), 'Success', 'Unpacking')
        		global pre_streamset_file
        		for root, directories, files in os.walk(staging_area):
        			for filename in files:
        				starttime = time.asctime(time.localtime(time.time()))
        				pre_streamset_file = filename
        				file1 = staging_area + '/' + filename
        				out = validate(file1)

				        endtime = time.asctime(time.localtime(time.time()))
        				db_entry(starttime, endtime, 'PRE-STREAMSETS', pre_streamset_file, out.replace('+',''), 'Pre-streamsets validation')        
 				        print('OUT = ' + out + ' FILE=' + file1)
				        if 'success' in out.lower():
				        	shutil.move(file1, streamsets_area)
 
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




