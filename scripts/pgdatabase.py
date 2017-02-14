import psycopg2

def get_connection():
    connection = psycopg2.connect(database="nsdc", user="postgres", password="book2mno", host="localhost", port="5432")
    return connection

def db_entry(start_time, end_time, step, filename, status, description):
    connection = get_connection()

    print "Opened database successfully"
    insert_db = connection.cursor()
    insert_db.execute('''INSERT INTO file_journey_audit (start_time, end_time, step, filename, status, description) \
        VALUES (%s, %s, %s, %s, %s, %s )''', (start_time, end_time, step, filename, status, description))
    connection.commit()
    print 'DB_ENTRY - Audit entry added for ' + filename
    connection.close()

def db_entry_chart(filename, processed, errors):
    connection = get_connection()

    print "Opened database successfullyi for write to file_journey_audit"
    insert_db = connection.cursor()
    insert_db.execute('''INSERT INTO file_journey_audit_chart (filename, processed, errors) \
        VALUES (%s, %s, %s )''', (filename, processed, errors))
    connection.commit()
    print 'DB_ENTRY_CHART - Audit entry added for ' + filename
    connection.close()
 
def db_read(filename):

    connection = get_connection()
    print "Opened database for READ successfully"
    list =[]

    cur = connection.cursor()
    cur.execute('''SELECT js.short_name
                     FROM JOURNEY_VERSION jv,
                          JOURNEY_VERSION_STEP jvs,
                          JOURNEY_STEP js
                    WHERE jv.journey_version_id = jvs.journey_version_id
                      AND js.journey_step_id = jvs.journey_step_id
                      AND position(jv.validator in  %s) > 0''', (filename,))

    rows = cur.fetchall()

    for row in rows:
        list.append(row[0])

    connection.close()
    return list
