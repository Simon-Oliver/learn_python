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

