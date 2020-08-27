import time
import random


def fake_sensor():
    time.sleep(2)
    if(bool(random.getrandbits(1))):
        return random.randint(20, 26)
    else:
        raise Exception("Sensor disconnected")


err = 0
while True:
    try:
        temp = fake_sensor()
        print(temp)
        pass
    except Exception as e:
        err += 1
        print(e, f"Error count {err}")
        pass
