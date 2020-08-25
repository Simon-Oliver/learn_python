import time

while True:
    try:
        f = open("test.txt", "r")

        print(f)
        time.sleep(5)
        pass
    except Exception as e:
        print(e)
        time.sleep(5)
        pass
