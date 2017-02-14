#!/usr/bin/python
import sys
import os
import time
import shutil
from subprocess import check_output
import psycopg2
from pgdatabase import *
from setup import *
import re

counter = 0
errors = 0
records = 0
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
        print "FileName is valid"
        status = "Accepted"
        reason = "Filename is matching"
        endtime = timestamp()
        return starttime, endtime, status, reason
    else:
        print "Incorrect Filename."
        shutil.move(filename, rejected)
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
        shutil.move(filename, rejected)
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
        shutil.move(filename, rejected)
        status = "Rejected"
        reason = "First Line check failed."
        endtime = timestamp()
        return starttime, endtime, status, reason
    else:
        print "Period :", firstline[9:12]
        shutil.move(filename, accepted)
        status = "Accepted"
        reason = "First Line check successful."
        endtime = timestamp()
        return starttime, endtime, status, reason

def last_line(filename):
    """
    Checks the last line of input file as per metadata condition.
    """
    starttime = timestamp()
    lastline = check_output(['tail', '-1', filename])
    lastline = lastline.strip()
    if len(lastline) != 50:
        print "Length of Last Line is not equal to 50"
        shutil.move(filename, rejected)
        status = "Rejected"
        reason = "Last line check failed."
        endtime = timestamp()
        return starttime, endtime, status, reason
    else:
        print "Record Count : ", lastline[-11:]
        shutil.move(filename, accepted)
        status = "Accepted"
        reason = "Last Line check successful."
        endtime = timestamp()
        return starttime, endtime, status, reason

def get_no_of_records(filename):
    global  records
    lastline = check_output(['tail', '-1', filename])
    records = lastline[-11]
    records

def record_type_check(filename):
    """
    Checks the remaining records of input file as per metadata condition.
    """
    starttime = timestamp()
    records = get_no_of_records()

    with open(filename) as lines:
        # Skip the first line - header
        next(lines)
        for line in lines:
            prog = re.compile('^[0-9]{50}$')
            result.prog.match(line.replace('\r\n', ''))
            record_type = line[12:14]
            global errors
            global counter
            if result is not None:
                if 59 < int(record_type) < 66:
                    counter = counter + 1
                    if counter == int(records):
                        print('No errors')
                        db_entry_chart(filename, counters, errors)
                        break
                
                # shutil.move(filename, accepted)
                # status = "Accepted"
                # reason = "Record Type data is between 60 and 65"
                # endtime = timestamp()
                # return starttime, endtime, status, reason
                else:
                    errors =  errors + 1
    

        if errors > 0:
            db_entry_chart(filename, counters, errors)
            print "Record Type data is not between 60 and 65."
            shutil.move(filename, rejected)
            status = "Rejected"
            reason = "Record Type data is not between 60 and 65"
            endtime = timestamp()
            return starttime, endtime, status, 
        else:
            shutil.move(filename, accepted)
            status = "Accepted"
            reason = "Record Type data is between 60 and 65"
            endtime = timestamp()
            return starttime, endtime, status, reason




def file_data(filename):
    """
    Checks the remaining records of input file as per metadata condition.
    """
    starttime = timestamp()
    with open(filename) as lines:
        next(lines)
        count = 1
        null_data = 0
        for line in lines:
            line = line.strip()
            if len(line) != 50:
                count = count + 1
                print count, " : Line not exactly 50"
                shutil.move(filename, rejected)
                status = "Rejected"
                reason = "Length of line is not equal to 50"
                endtime = timestamp()
                return starttime, endtime, status, reason
            else:
                count = count + 1
                print "\n", count
                vatref = line[0:7]
                if int(vatref) == 9999999:
                    null_data = null_data + 1
                else:
                    print "Vatref :", vatref
                checkdigits = line[7:9]
                if int(checkdigits) == 99:
                    null_data = null_data + 1
                else:
                    print "Checkdigits :", checkdigits
                periods = line[9:12]
                if  int(periods) == 999:
                    null_data = null_data + 1
                else:
                    print "Periods : ", periods
                record_type = line[12:14]
                if int(record_type) == 99:
                    null_data = null_data + 1
                else:
                    print "Record Type :", record_type
                stagger = line[17:19]
                if int(stagger) == 99:
                    null_data = null_data + 1
                else:
                    print "Stagger :", stagger
                sic2007 = line[19:24]
                if int(sic2007) == 99999:
                    null_data = null_data + 1
                else:
                    print "Sic2007 :", sic2007
                return_type = line[24:25]
                if int(return_type) == 9:
                    null_data = null_data + 1
                else:
                    print "Return Type :", return_type
                turnover = line[25:36]
                if int(turnover) == 99999999999:
                    null_data = null_data + 1
                else:
                    print "Turnover :", turnover
                expenditure = line[36:44]
                if int(expenditure) == 99999999:
                    null_data = null_data + 1
                else:
                    print "Expenditure :", expenditure
                dates = line[44:]
                if int(dates) == 999999:
                    null_data = null_data + 1
                else:
                    print "Date :", dates
    no_of_lines = int(check_output(["wc", "-l", filename]).split()[0]) + 1
    total_fields = no_of_lines * 10
    record_percent = float(null_data) / float(total_fields)
    if record_percent > 0.25:
        shutil.move(filename, rejected)
        status = "Rejected"
        reason = "Total null data is more than 25%"
        endtime = timestamp()
        return starttime, endtime, status, reason
    else:
        shutil.move(filename, accepted)
        status = "Accepted"
        reason = "All the checks are complete"
        endtime = timestamp()
        return starttime, endtime, status, reason

def validate(filename):
    check_file_name=[]
    file_size=[]
    firstline=[]
    lastline=[]
    filedata=[]
    rd_check=[]
    if filename is not None:
        steps = db_read(filename)
        if 'FILENAME_VALIDATION' in steps:
            check_file_name = check_filename(filename)

        if 'FILESIZE_VALIDATION' in steps:
            file_size = file_size_mb(filename)

        if 'HEADER_VALIDATION' in steps:
            firstline = first_line(filename)

        if 'FOOTER_VALIDATION' in steps:
            lastline = last_line(filename)

        if 'FILEDATA_VALIDATION' in steps:
            filedata = file_data(filename)

        if 'RCD_TYPE_VALIDATION' in steps:
            rd_check = record_type_check(filename)

        if check_file_name:
            starttime = check_file_name[0]
            endtime = check_file_name[1]
            status = check_file_name[2]
            reason = check_file_name[3]
            db_entry(starttime, endtime, filename, 'FILENAME_VALIDATION', status, reason)

        if file_size:
            starttime = file_size[0]
            endtime = file_size[1]
            status = file_size[2]
            reason = file_size[3]
            db_entry(starttime, endtime, filename, 'FILESIZE_VALIDATION', status, reason)

        if firstline:
            starttime = firstline[0]
            endtime = firstline[1]
            status = firstline[2]
            reason = firstline[3]
            db_entry(starttime, endtime, filename, 'HEADER_VALIDATION', status, reason)

        if lastline:
            starttime = lastline[0]
            endtime = lastline[1]
            status = lastline[2]
            reason = lastline[3]
            db_entry(starttime, endtime, filename, 'FOOTER_VALIDATION', status, reason)

        if rd_check:
            starttime = rd_check[0]
            endtime = rd_check[1]
            status = rd_check[2]
            reason = rd_check[3]
            db_entry(starttime, endtime, filename, 'RCD_TYPE_VALIDATION', status, reason)

        if filedata:
            starttime = filedata[0]
            endtime = filedata[1]
            status = filedata[2]
            reason = filedata[3]
            db_entry(starttime, endtime, filename, 'STRUCTURAL_VALIDATION', status, reason)

    else:
        print """
==> Usage : python before_streamsets.py <filename>
filename - where filename is the file which need to be processed
                   before its passed for further processing to Streamsets. 
        """

