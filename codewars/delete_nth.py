def delete_nth(order, max_e):
    # code here
    dic = {}
    new_arr = []

    for n in order:
        if n in dic:
            if dic[n] < max_e:
                new_arr.append(n)
                dic[n] += 1
        else:
            dic[n] = 1
            new_arr.append(n)

    return new_arr


print(delete_nth([1, 1, 3, 3, 7, 2, 2, 2, 2], 0))
# delete_nth([20, 37, 20, 21], 1)
# delete_nth([1, 1, 3, 3, 7, 2, 2, 2, 2], 3)
