import subprocess

def unpack_decrypt(password, destination, inputfile):
	p = subprocess.Popen(['/home/cloudera/scripts/unpacking.sh', password, destination, inputfile], stdout = subprocess.PIPE, stderr = subprocess.PIPE)
	out, err = p.communicate()
	return out