def zero(arg=False): return arg(0) if arg else 0  # your code here


def one(arg=False): return arg(1) if arg else 1  # your code here


def two(arg=False): return arg(2) if arg else 2  # your code here


def three(arg=False): return 3  # your code here


def four(arg=False): return 4  # your code here


def five(arg=False): return 5  # your code here


def six(arg=False): return 6  # your code here


def seven(arg=False): return 7  # your code here


def eight(arg=False): return 8  # your code here


def nine(arg=False): return 9  # your code here


def plus(func): func()  # your code here


def minus(): return  # your code here


def times(n):
    def multiplier(x):
        return n * x  # your code here
    return multiplier


def divided_by(): return  # your code here


print(zero(times(two())))
