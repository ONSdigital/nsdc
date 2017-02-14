#!/bin/sh

export NSDC_BASE_DIRECTORY=/home/cloudera/landing

avcheck() {
	folder=$(dirname $1)
	
	clamscan -r --quiet --move=${folder}/VIRUS $1

	# clamscan -r --remove ${NSDC_BASE_DIRECTORY}/$file   # WARNING - File is gone for good. #
	if [ -f "$1" ]
	then
	  # Write to the database that the file does not contain any virus
	  echo "Success"
	else
	  echo "Failed"
	fi	
}

if [ $# -ne 1 ]
then
  echo "Usage: $0 full_file_path" 
  exit 1; 
else
  if [ ! -d ${NSDC_BASE_DIRECTORY}/VIRUS ]
  then
	mkdir -p ${NSDC_BASE_DIRECTORY}/VIRUS
  fi	
  avcheck $1 $2
fi
