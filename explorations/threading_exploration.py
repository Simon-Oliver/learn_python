import time
import threading

start = time.perf_counter()


def do_something(seconds):
    print(f'Sleeping {seconds} second(s)')
    time.sleep(seconds)
    print('Done Sleeping...')


t1 = threading.Thread(target=do_something, args=[3])
t2 = threading.Thread(target=do_something, args=[3])

t1.start()  # Starting the thread
t2.start()

t1.join()
t2.join()  # Will run the threading before running the below code


threads = []

for _ in range(10):
    t = threading.Thread(target=do_something, args=[3])
    t.start()
    threads.append(t)

for thread in threads:
    thread.join()

finish = time.perf_counter()

print(f'Finished in {round(finish-start, 2)} second(s)')
