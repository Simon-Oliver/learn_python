import os

count = {}

for f in os.listdir("/Users/Simon/Downloads"):
    extension = os.path.splitext(f)[1]
    if extension not in count:
        count[extension] = 1
    else:
        count[extension] += 1

print(count)
