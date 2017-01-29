import re
from subprocess import check_output

counter = 0
errors = 0
records = 0

def last_Line(filepath):
  global  records
  lastline = check_output(['tail', '-1', filepath])
  records = lastline[-11:]
  return records

def validate(filepath):
  records = last_Line(filepath)
  print('Records = ' + records)
  with open(filepath) as lines:
    header_line = next(lines)
    print(header_line)
    for line in lines:
      try:
        # Change record root field value to a STRING value
        prog = re.compile('^[0-9]{50}$')
        result = prog.match(line.replace('\r\n', ''))
        global counter
        global errors
        # Write record to procesor output
        if result is not None:
          VatRef = line[0:7]
          CheckDigits = line[7:9]
          Period = line[9:12]
          RecordType = int(line[12:14])
          if (RecordType) < 60  or (RecordType) > 65:
            raise Exception('Invalid Record Type')
          Stagger = line[14:16]  
          Vatsic5 = line[16:21] 
          ReturnType = line[21:22]
          Turnover = line[22:33]
          Expenditure = line[36:44]
          DataDate = line[44:50]
          hdfsShore = line[0:33] + line[36:50] 

          counter = counter + 1
          if counter == int(records):
            print('Break')
            return "Success"

        else:
          raise Exception('Regular expression not matched')

    
      except Exception as e:
        errors = errors + 1
        print(line, str(e))

    print('COUNTER = ' + str(counter) + ' ERRORS = ' + str(errors))
    return "Failed"
# if __name__ == "__main__":
#   validate('/home/cloudera/staging/irt_synth_201610')
#   print('COUNTER = ' + str(counter) + ' ,ERRORS=' + str(errors))