def count(string):
    obj = {}
    for l in string:
        obj[l] = obj.get(l, 0) + 1

    return obj


print(count(""))
