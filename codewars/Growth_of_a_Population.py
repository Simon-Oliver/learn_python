def nb_year(p0, percent, aug, p):
    nb_year = 0
    population = p0

    while population < p:
        nb_year = nb_year + 1
        population = population + (population * (percent * 10**-2)) + aug

    return nb_year


print(nb_year(1500, 5, 100, 5000))  # 15
print(nb_year(1500000, 2.5, 10000, 2000000))  # 10
print(nb_year(1500000, 0.25, 1000, 2000000))  # 94
