def sum_dig_pow(a, b):  # range(a, b + 1) will be studied by the function
    # your code here
    num_arr = list(range(a, b + 1))

    for n in num_arr:
        print([int(i) for i in str(n)])


sum_dig_pow(300, 303)
