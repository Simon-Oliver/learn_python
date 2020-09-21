import string
import re

regex = re.compile('[^a-zA-Z]')


def is_pangram(s):
    newS = regex.sub('', s)
    check = list("abcdefghijklmnopqrstuvwxyz")

    for l in newS:
        print(l)

    return False


is_pangram("Test lol")
