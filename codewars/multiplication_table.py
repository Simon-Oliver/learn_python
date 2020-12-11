def multiplication_table(size):
    arr = []
    for i in range(size):
        chunck = []
        for n in range(size):
            chunck.append((i+1) * (n+1))
        arr.append(chunck)
    return arr 


print(multiplication_table(3))

    # 3, [[1,2,3],[2,4,6],[3,6,9]]