#!/usr/bin/python
import sys
import os
import time
import shutil
from subprocess import check_output
import psycopg2

def check_dir(directory):
    """
    Checks if Accepted and Rejected directories are created or not for
    transfering the input files depending upon their completion status.
    """
    if not os.path.exists(directory):
        os.makedirs(directory)
        print directory, " folder is created."
    else:
        print directory, " folder is present in current directory."

def timestamp():
    """
    Check the start and end timestamp of the Input file.
    """
    timing = time.asctime(time.localtime(time.time()))
    print "File processing started at : ", timing
    return timing

def check_filename(filename):
    """
    Checks if the input filename is as per provided metdata.
    """
    starttime = timestamp()
    if "irt_synth" in filename:
        print "FileName is proper"
        status = "Accepted"
        reason = "Filename is matching"
        endtime = timestamp()
        return starttime, endtime, status, reason
    else:
        print "Incorrect Filename."
        check_dir('Rejected')
        shutil.move(filename, 'Rejected')
        status = "Rejected"
        reason = "Filename is not matching"
        endtime = timestamp()
        return starttime, endtime, status, reason

def file_size_mb(filename):
    """
    Checks if input file size falls between required filesize range.
    """
    starttime = timestamp()
    file_size = float(os.path.getsize(filename)) / (1024 * 1024)
    file_size = str(file_size).split('.')[0]
    if 30 <= int(file_size) <= 40:
        print "Size of the file is: ", file_size
        status = "Accepted"
        reason = "Filesize between range 30M-40M"
        endtime = timestamp()
        return starttime, endtime, status, reason
    else:
        print "Size of the file is not in range of 30M and 40M."
        check_dir('Rejected')
        shutil.move(filename, 'Rejected')
        status = "Rejected"
        reason = "File size is not in range"
        endtime = timestamp()
        return starttime, endtime, status, reason

def first_line(filename):
    """
    Checks the first line of input file as per metadata condition.
    """
    starttime = timestamp()
    firstline = check_output(['head', '-1', filename])
    firstline = firstline.strip()
    if len(firstline) != 50:
        print "Length of first Line is not equal to 50"
        check_dir('Rejected')
        shutil.move(filename, 'Rejected')
        status = "Rejected"
        reason = "Length of the first line is not equal to 50"
        endtime = timestamp()
        return starttime, endtime, status, reason
    else:
        print "Period :", firstline[9:12]
        return firstline[9:12]

def last_line(filename):
    """
    Checks the last line of input file as per metadata condition.
    """
    starttime = timestamp()
    lastline = check_output(['tail', '-1', filename])
    lastline = lastline.strip()
    if len(lastline) != 50:
        print "Length of Last Line is not equal to 50"
        check_dir('Rejected')
        shutil.move(filename, 'Rejected')
        status = "Rejected"
        reason = "Length of last line is not equal to 50"
        endtime = timestamp()
        return starttime, endtime, status, reason
    else:
        print "Record Count : ", lastline[-11:]
        return lastline[-11:]

def file_data(filename):
    """
    Checks the remaining records of input file as per metadata condition.
    """
    starttime = timestamp()
    first_line(filename)
    with open(filename) as lines:
        next(lines)
        count = 1
        null_data = 0
        for line in lines:
            line = line.strip()
            if len(line) != 50:
                count = count + 1
                print count, " : Line not exactly 50"
                check_dir('Rejected')
                shutil.move(filename, 'Rejected')
                status = "Rejected"
                reason = "Length of line is not equal to 50"
                endtime = timestamp()
                return starttime, endtime, status, reason
            else:
                count = count + 1
                print "\n", count
                vatref = line[0:7]
                if vatref == 9999999:
                    null_data = null_data + 1
                else:
                    print "Vatref :", vatref
                checkdigits = line[7:9]
                if checkdigits == 99:
                    null_data = null_data + 1
                else:
                    print "Checkdigits :", checkdigits
                periods = line[9:12]
                if  periods == 999:
                    null_data = null_data + 1
                else:
                    print "Periods : ", periods
                record_type = line[12:14]
                if record_type == 99:
                    null_data = null_data + 1
                else:
                    print "Record Type :", record_type
                stagger = line[17:19]
                if stagger == 99:
                    null_data = null_data + 1
                else:
                    print "Stagger :", stagger
                sic2007 = line[19:24]
                if sic2007 == 99999:
                    null_data = null_data + 1
                else:
                    print "Sic2007 :", sic2007
                return_type = line[24:25]
                if return_type == 9:
                    null_data = null_data + 1
                else:
                    print "Return Type :", return_type
                turnover = line[25:36]
                if turnover == 99999999999:
                    null_data = null_data + 1
                else:
                    print "Turnover :", turnover
                expenditure = line[36:44]
                if expenditure == 99999999:
                    null_data = null_data + 1
                else:
                    print "Expenditure :", expenditure
                dates = line[44:]
                if dates == 999999:
                    null_data = null_data + 1
                else:
                    print "Date :", dates
    last_line(filename)
    no_of_lines = int(check_output(["wc", "-l", filename]).split()[0]) + 1
    total_fields = no_of_lines * 10
    record_percent = float(null_data) / float(total_fields)
    if record_percent > 0.25:
        check_dir('Rejected')
        shutil.move(filename, 'Rejected')
        status = "Rejected"
        reason = "Total null data is more than 25%"
        endtime = timestamp()
        return starttime, endtime, status, reason
    else:
        check_dir('Accepted')
        shutil.move(filename, 'Accepted')
        status = "Accepted"
        reason = "All the checks are complete"
        endtime = timestamp()
        return starttime, endtime, status, reason

#Sending Data to Database
def db_entry(starttime, endtime, filename, status, reason):
    """
    Writing the required data to Database
    """
    connection = psycopg2.connect(database="nsdc", user="postgres", \
    password="admin", host="localhost", port="5432")
    print "Opened database successfully"
    create_db = connection.cursor()
    create_db.execute('''CREATE TABLE IF NOT EXISTS STREAMSETS_PRECHECK
    (id SERIAL PRIMARY KEY  NOT NULL,
    start_timestamp VARCHAR(1000)  NOT NULL, 
    end_timestamp VARCHAR(1000) NOT NULL,
    file  VARCHAR(1000), 
    status VARCHAR(1000), 
    reason VARCHAR(1000)
    )''')
    connection.commit()
    insert_db = connection.cursor()
    insert_db.execute('''INSERT INTO STREAMSETS_PRECHECK (start_timestamp, \
    end_timestamp, file, status, reason) \
    VALUES (%s, %s, %s, %s, %s )''', (starttime, endtime, filename, status, reason))
    connection.commit()
    print "Records entered successfully : \
    (StartTime: %s, EndTime: %s, FileName: %s , Status: %s, Reason: %s) " \
    % (starttime, endtime, filename, status, reason)
    connection.close()

def main():
    """
    Main function
    """
    if len(sys.argv[1:]) > 0:
        filename = sys.argv[-1]
        starttime = timestamp()
        file_size = file_size_mb(filename)
        check_file_name = check_filename(filename)
        filedata = file_data(filename)

        if check_file_name:
            status = check_file_name[0]
            reason = check_file_name[1]
            endtime = timestamp()
            db_entry(starttime, endtime, filename, status, reason)

        if file_size:
            status = file_size[0]
            reason = file_size[1]
            endtime = timestamp()
            db_entry(starttime, endtime, filename, status, reason)

        if filedata:
            status = filedata[0]
            reason = filedata[1]
            endtime = timestamp()
            db_entry(starttime, endtime, filename, status, reason)
    else:
        print """
==> Usage : python before_streamsets.py <filename>

filename - where filename is the file which need to be processed
                   before its passed for further processing to Streamsets. 
        """

if __name__ == "__main__":
    main()