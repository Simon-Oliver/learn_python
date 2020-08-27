import time
import random
from datetime import datetime, timedelta


def fake_sensor():
    time.sleep(1)
    if(bool(random.getrandbits(1))):
        return random.randint(20, 26)
    else:
        raise Exception("Sensor disconnected")


class TestDB():
    def __init__(self):
        self._started_at = datetime.utcnow()  # Time when class created
        self.temp_temp = []  # Temporary collection of temperature to calculate the average
        self.temp_hum = []  # Temporary collection of humidity to calculate the average
        self.delay = 0  # Delay in seconds of when average temp will be written to file
        self.stop_run = False

    def time_run(self):
        time_passed = datetime.utcnow() - self._started_at
        if time_passed.total_seconds() > self.delay:
            return True
        return False

    def reset_time(self):
        self._started_at = datetime.utcnow()
        self.temp_temp = []
        self.temp_hum = []
        self.stop_run = False

    def write_temp(self, temp):
        print(temp)

    def stop(self):
        self.stop_run = True
        print("DB stopped")

    def start(self, delay, temp):
        self.stop_run = False
        self.delay = delay
        if not self.stop_run:
            if not self.time_run():
                print("-")
                # print(datetime.utcnow() - self._started_at)
                # time.sleep(1)
            else:
                self.write_temp(temp)
                self.reset_time()


db = TestDB()

err = 0
while True:
    try:
        temp = fake_sensor()
        db.start(3, temp)
        pass
    except Exception as e:
        err += 1
        print(e, f"Error count {err}")
        db.stop()
        pass
