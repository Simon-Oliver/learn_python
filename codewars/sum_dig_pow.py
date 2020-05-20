def sum_dig_pow(a, b):  # range(a, b + 1) will be studied by the function
    # your code here
    num_arr = list(range(a, b + 1))
    add_arr = []

    for n in num_arr:
        arr = [int(i) for i in str(n)]
        for num, i in enumerate(arr, start=1):
            add_arr.append(pow(num, i))
            print(sum(add_arr))
        add_arr = []


print(sum_dig_pow(300, 303))

#[1, 2, 3, 4, 5, 6, 7, 8, 9, 89]
