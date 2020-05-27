def zero(arg=False): return arg(0) if arg else 0  # your code here


def one(arg=False): return arg(1) if arg else 1  # your code here


def two(arg=False): return arg(2) if arg else 2  # your code here


def three(arg=False): return arg(3) if arg else 3  # your code here


def four(arg=False): return arg(4) if arg else 4  # your code here


def five(arg=False): return arg(5) if arg else 5  # your code here


def six(arg=False): return arg(6) if arg else 6  # your code here


def seven(arg=False): return arg(7) if arg else 7  # your code here


def eight(arg=False): return arg(8) if arg else 8  # your code here


def nine(arg=False): return arg(9) if arg else 9  # your code here


def plus(n):
    def func(x):
        return n + x
    return func  # your code here


def minus(n):   # your code here
    def func(x):
        return x - n
    return func


def times(n):
    def multiplier(x):
        return n * x  # your code here
    return multiplier


def divided_by(n):
    def func(x):
        return int(x / n)
    return func  # your code here


print(zero(times(two())))
print(one(plus(two())))
print(nine(minus(five())))
print(nine(divided_by(three())))
