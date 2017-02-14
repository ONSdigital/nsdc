import os

ftp_download = '/home/cloudera/landing'
staging_area = '/home/cloudera/staging'
processed_area = '/home/cloudera/processed'
streamsets_area = '/home/cloudera/streamsets'
rejected = '/home/cloudera/rejected'
accepted = '/home/cloudera/accepted'
virus = '/home/cloudera/landing/VIRUS'

if not os.path.exists(ftp_download):
        os.mkdir(ftp_download)

if not os.path.exists(staging_area):
        os.mkdir(staging_area)

if not os.path.exists(streamsets_area):
        os.mkdir(streamsets_area)

if not os.path.exists(rejected):
        os.mkdir(rejected)

if not os.path.exists(accepted):
        os.mkdir(accepted)                

if not os.path.exists(virus):
        os.mkdir(virus)                

if not os.path.exists(processed_area):
        os.mkdir(processed_area)                
