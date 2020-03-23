import time
import random
from datetime import datetime, timedelta


class Log():
    def __init__(self):
        self._started_at = datetime.utcnow()  # Time when class created
        self.temp_temp = []  # Temporary collection of temperature to calculate the average
        self.delay = 0  # Delay in seconds of when average temp will be written to file

    def time_run(self):
        time_passed = datetime.utcnow() - self._started_at
        if time_passed.total_seconds() > self.delay:
            return True
        return False

    def calc_average(self):
        return sum(self.temp_temp) / len(self.temp_temp)

    def reset_time(self):
        self._started_at = datetime.utcnow()
        self.temp_temp = []

    def write_temp(self, temp):
        f = open("./temp.csv", "a")
        str = f"{temp}, {datetime.now()}\n"
        f.write(str)

        # Close the file
        f.close()

    def start(self, delay):
        self.delay = delay
        if not self.time_run():
            print(self.time_run())
            self.temp_temp.append(random.randint(1, 101))
            time.sleep(1)
        else:
            print(self.time_run())
            print(self.calc_average())
            self.write_temp(self.calc_average())
            time.sleep(1)
            self.reset_time()


t = Log()
min_to_sec = 1 * 60

try:
    while True:
        t.start(min_to_sec)
except:
    print('temp_sensor stopped')
    t.write_temp('stopped')
