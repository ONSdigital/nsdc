#!/bin/sh

nsdc_unpacking() {
    # unzip -d destination -P password input_zip_file
	unzip -d $2 -P $1 $3
	# unzip -d $2 -P $1 $3
}


if [ $# -ne 3 ]
then
  echo "Usage: $0 password destination_dir filepath" 
  exit 1; 
else
  nsdc_unpacking $1 $2 $3
fi