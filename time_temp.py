import time
from datetime import datetime, timedelta


class Logtemp:
    t_end = time.time() + 5
    temp_temp = []
    is_running = False

    def __init__(self):
        pass

    @classmethod
    def record_temp(cls):
        cls.is_running = True
        while time.time() < cls.t_end:
            print(datetime.now())
            cls.temp_temp.append(datetime.now())
            time.sleep(1)
        cls.is_running = False
        return cls.temp_temp


l1 = Logtemp()


num = 2

while num > 0:

    l1.record_temp()
    print("---------- Done")
    num - 1
