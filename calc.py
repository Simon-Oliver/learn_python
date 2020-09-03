def multiply(a, b):
    return a * b


def divide(a, b):
    if(b == 0):
        raise ValueError("Can't divide by zero!")
    return a / b


def add(a, b):
    return a + b


def subtract(a, b):
    return a - b


print(divide(10, 2))
