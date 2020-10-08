# Example: n = 86240 should return "(2**5)(5)(7**2)(11)"


def primeFactors(n):
    arr = []
    prod = 1
    temp = n
    count = 2


while prod != n:
    for e in arr:
        prod *= e

    for i in range(2, count):
        if count % i == 0:
            count += 1
        else:
            while temp % i == 0:
                temp = temp / i
                arr.append(i)


# print(primeFactors(7775460))
# primeFactors(7775460), "(2**2)(3**3)(5)(7)(11**2)(17)"
