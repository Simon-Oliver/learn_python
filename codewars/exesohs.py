def xo(s):
    x = 0
    o = 0
    for l in s.lower():
        if l == 'x':
            x += 1
        if l == 'o':
            o += 1

    return x == o
    # return True

# nicer solution


def xo(s):
    s = s.lower()
    return s.count('x') == s.count('o')


print(xo('xo'))
print(xo('xo0'))
print(xo('xxxoo'))
