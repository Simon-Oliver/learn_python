import string
import re

regex = re.compile('[^a-zA-Z]')


def is_pangram(param):

    newS = regex.sub('', param).strip().lower()
    check = list("abcdefghijklmnopqrstuvwxyz")
    count = 0

    for l in newS:
        if l in check:
            count += 1

    if count >= len(check):
        return True

    return False


print(is_pangram("Cwm fjord bank glyphs vext quiz"))
