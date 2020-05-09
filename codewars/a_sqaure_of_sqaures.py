def is_square(n):
    if(n < 0):
        return False
    else:
        num = n**(.5)
        return num.is_integer()


print(is_square(-1))
print(is_square(0))
print(is_square(25))
