name = []
long = []
lat = []
date = []
intensity = []
type = []

dataFile = open('MOCK_DATA.csv','r')
lineList =  dataFile.readlines()
for line in lineList:
    data = line.strip("\n").split(",")
    name.append(data[0])
    long.append(data[1])
    lat.append(data[2])
    date.append(data[3])
    intensity.append(data[4])
    type.append(data[5])
    
def search(filter):
    