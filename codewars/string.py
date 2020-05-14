def disemvowel(string):
    string = list(string)
    vowels = ['a', 'e', 'i', 'o', 'u']

    for v in vowels:
        for l in string:
            if l.lower() == v.lower():
                string.remove(l)

    return ''.join(string)


print(disemvowel("This website is for losers LOL!"))
