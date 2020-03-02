f = open('sample.txt')

for line in f:
    num = line.split()
    print(num[0])
