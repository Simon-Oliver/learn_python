import math


def search(min, max):
    left = min
    right = max
    count = 0
    t = 2573

    while left <= right:
        mid = math.floor((left + right)/2)

        if t < mid:
            right = mid - 1
            count += 1

        elif t > mid:
            left = mid + 1
            count += 1

        else:
            print(mid, " | ", count)
            return mid


search(1, 3000)
