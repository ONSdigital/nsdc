#!/usr/bin/python
import time
import sys
import subprocess
import psycopg2

#Start time for processing file
def start_time():
    starttime = time.asctime(time.localtime(time.time()))
    print starttime
    return starttime

#First Line
def first_line(filename):
    firstline = subprocess.check_output(['head', '-1', filename])
    firstline = firstline.strip()
    if len(firstline) != 50:
        print "Length of first Line is not equal to 50"
        sys.exit()
    else:
        print "Period :", firstline[9:12]
        return firstline[9:12]

#Last Line
def last_line(filename):
    lastline = subprocess.check_output(['tail', '-1', filename])
    lastline = lastline.strip()
    if len(lastline) != 50:
        print "Length of Last Line is not equal to 50"
        sys.exit()
    else:
        print "Record Count : ", lastline[-11:]
        return lastline[-11:]

#Process remaining lines of file
def remainder_lines():
    with open(filename) as lines:
        next(lines)
        count = 1
        for line in lines:
            line = line.strip()
            if len(line) != 50:
                count = count + 1
                print count , " : Line not exactly 50"
            else:
                count = count + 1
                print "\n", count
                print "Vatref :", line[0:7]
                print "Checkdigits :", line[7:9]
                print "Periods : ", line[9:12]
                print "Record Type :", line[12:14]
                print "Stagger :", line[17:19]
                print "Sic2007 :", line[19:24]
                print "Return Type :", line[24:25]
                print "Turnover :", line[25:36]
                print "Expenditure :", line[36:44]
                print "Date :", line[44:]

#End time for processing file
def end_time():
    endtime = time.asctime(time.localtime(time.time()))
    print endtime
    return endtime

#Sending Data to Database
def db_entry(starttime, endtime, filename):
    connection = psycopg2.connect(database="nsdc", user="postgres", password="admin", host="localhost", port="5432")
    print "Opened database successfully"
    create_db = connection.cursor()
    create_db.execute('''CREATE TABLE IF NOT EXISTS SSETS_PRECHECK
    (id SERIAL PRIMARY KEY  NOT NULL,
    start_timestamp VARCHAR(1000)  NOT NULL, 
    end_timestamp VARCHAR(1000) NOT NULL,
    file  VARCHAR(1000)
    )''')
    print "Table created successfully"
    connection.commit()
    insert_db = connection.cursor()
    insert_db.execute('''INSERT INTO SSETS_PRECHECK (start_timestamp, end_timestamp, file) \
        VALUES (%s, %s, %s )''', (starttime, endtime, filename))
    connection.commit()
    print "Records created successfully";
    connection.close()

if __name__ == "__main__":
    filename = sys.argv[-1]
    starttime = start_time()
    firstline = first_line(filename)
    lastline = last_line(filename)
    endtime = end_time()
    db_entry(starttime, endtime, filename)
