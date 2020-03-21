import time
from threading import Thread
from datetime import datetime, timedelta


class Logtemp(Thread):
    def __init__(self, seconds):
        '''Note that when you override __init__, you must
           use super() to call __init__() in the base class
           so you'll get all the "chocolately-goodness" of
           threading (i.e., the magic that sets up the thread
           within the OS) or it won't work.
        '''
        super().__init__()
        self.temp_temp = []
        self.delay = time.time() + seconds
        self.is_done = False

    def done(self):
        self.is_done = True

    def run(self):
        while not self.is_done:
            print("--------------------- Done")
            time.sleep(5)


t = Logtemp(5)
t.start()

t_end = time.time() + 60 * 15
while True:
    print(datetime.now())
    t.temp_temp.append(datetime.now())
    time.sleep(1)
t.done()
