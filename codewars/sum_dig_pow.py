def sum_dig_pow(a, b):  # range(a, b + 1) will be studied by the function
    # your code here
    num_arr = list(range(a, b + 1))
    add_arr = []
    final = []
    for n in num_arr:
        arr = [int(i) for i in str(n)]
        for i, num in enumerate(arr):
            add_arr.append(pow(num, i+1))
        if n == sum(add_arr):
            final.append(n)
        add_arr = []
    return final

    # for num, i in enumerate(arr, start=1):
    #     add_arr.append(pow(num, i))
    #     print(sum(add_arr))
    # add_arr = []


print(sum_dig_pow(1, 100))

# [1, 2, 3, 4, 5, 6, 7, 8, 9, 89]
