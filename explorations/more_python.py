class TestClass:
    # Init is needed to be able to use parameters when creating a class
    def __init__(self, count, nameArr):
        self.count = count
        self.nameArr = nameArr

    # Creates an array for testing purposes
    def createNumArr(self, size):
        arr = []
        for x in range(0, size):
            arr.append(x)

        return arr


# Initializing testing array
tester = TestClass(5, "test")

print(tester.createNumArr(8))

# This will print every second item
a = tester.createNumArr(8)[::2] 
print(a)

# This will print the elements from index 3 to 5
b = tester.createNumArr(8)[3:6]
print(b)

# This will print the array in reverse
c = tester.createNumArr(8)[::-1]
print(c)

# This will slice the array from index 3 to the end
d = tester.createNumArr(8)[3:]
print(d)

# This will slice the array from the beginning to index 5
e = tester.createNumArr(8)[:5]
print(e)

# Making an actual copy of an array without creating a reference
f = tester.createNumArr(8)[:]
print(f)

# List squaring all elements in an array
test_arr = tester.createNumArr(9)
g = [i*i for i in test_arr]
print(g)

# Get the index of "brown" and return everything after 
t_string = "The brown fox jumps..."
brown_index = t_string.find("brown")
dot_index = t_string.find("...")
print(t_string[brown_index:])


# Get the index of the three dots at the end of the string and return everything between
new_string = t_string[brown_index:dot_index]
print(new_string)

# Tuples 
tuple_test = ("Max", 34)

# Check if something is in a tuple
check = "Max" in tuple_test


class Company:
    def __init__(self, name, size, revenue):
        self.name = name
        self.size = size
        self.revenue = revenue

    def getName(self):
        print(self.name)



class StartUp(Company):
    def __init__(self, investors):
        self.investors = investors

    def getInvestors(self):
        print(self.investors)


new_startup = StartUp("Cool Company",10000, 200000000, ["investor 1", "investor 2"])