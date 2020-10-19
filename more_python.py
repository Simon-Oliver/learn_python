class TestClass:
    # Init is needed to be able to use parameters when creating a class
    def __init__(self, name, age):
        self.age = age
        self.name = name

    def printName(self):
        print(self.name, self.age)



max_muster = TestClass("Max", 14)

max_muster.printName()