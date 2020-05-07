def likes(names):
    length = len(names)
    if(length == 0):
        print('no one likes this')
    elif(length == 1):
        print(f'{names[0]} likes this')

    elif(length == 2):
        print(f'{names[0]} and {names[1]} like this')

    elif(length == 3):
        print(f'{names[0]}, {names[1]} and {names[2]} like this')

    else:
        count = length - 2
        print(f'{names[0]}, {names[1]} and {count} others like this')


# likes(['Jacob', 'Alex']), 'Jacob and Alex like this')
# likes(['Max', 'John', 'Mark']), 'Max, John and Mark like this')
# likes(['Alex', 'Jacob', 'Mark', 'Max']), 'Alex, Jacob and 2 others like this')

likes(['Jacob', 'Alex'])
likes(['Max', 'John', 'Mark'])
likes(['Alex', 'Jacob', 'Mark', 'Max'])
