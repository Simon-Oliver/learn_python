import time


def delay_print(message):
    print(message)
    time.sleep(5)


while True:
    try:
        f = open("test_.txt", "r")
        delay_print("This is workign")
        pass
    except Exception as e:
        delay_print(e)
        pass
