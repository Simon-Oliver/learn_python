import random
import time

def make_random_num():
    print(random.randrange(0, 40, 1))
    return random.randrange(0, 40, 1)

def start_timer():
    while True:
        make_random_num()
        time.sleep(1)