import subprocess

def avcheck(filePath):
	p = subprocess.Popen(['/home/cloudera/scripts/av_clamscan.sh', filePath], stdout = subprocess.PIPE, stderr = subprocess.PIPE)
	# p = subprocess.Popen(['/home/cloudera/scripts/av_clamscan.sh', '/home/cloudera/landing', 'nsdc2.fix'], stdout = subprocess.PIPE, stderr = subprocess.PIPE)
	out, err = p.communicate()
	#print out
	return out