def bouncing_ball(h, bounce, window):
    if h > 0 and bounce > 0 and bounce < 1 and window < h:
        height = h * bounce
        count = 1
        while height > window:
            count += 2
            height = height * bounce
        return count
    return -1


print(bouncing_ball(3, 0.66, 1.5))  # should be 3
print(bouncing_ball(30, 0.66, 1.5))  # should be 15
print(bouncing_ball(1, 0.66, 1.5))  # should be 15
# testing(3, 0.66, 1.5, 3)
# testing(30, 0.66, 1.5, 15)
# testing(30, 0.75, 1.5, 21)
