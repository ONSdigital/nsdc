#!/bin/sh

sftp -b /home/cloudera/scripts/batchfile.txt -o IdentityFile=/home/cloudera/.ssh/id_rsa nsdc.alpha@fileons.sbl-online.co.uk

