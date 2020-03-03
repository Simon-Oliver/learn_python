f = open('sample.txt')

for line in f:
    num = line.split()
    print(num[0])

thisdict = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 1964
}

for k, v in thisdict.items():
    print(k, v)
