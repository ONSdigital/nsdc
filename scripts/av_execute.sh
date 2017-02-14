#!/bin/sh

export PATH=$PATH:/opt/sophos-av/bin
export NSDC_BASE_DIRECTORY=/home/cloudera

avcheck() {
	folder=$1
	file=$2
	
	result=`savscan -ss -remove $folder/$file | grep -ic virus`
	if [ $result == 0 ]
	then
	  mkdir -p ${NSDC_BASE_DIRECTORY}/monitor
	  # Move the file to watcher folder
	  cp $folder/$file ${NSDC_BASE_DIRECTORY}/monitor
	else
	  echo "File $file is infected and therefore discarded."
	fi	
}

if [ $# -ne 2 ]
then
  echo "Usage: $0 directory filename" 
  exit 1; 
else
  avcheck $1 $2
fi
