class TestClass:
    def __init__(self, name, age):
        self.age = age
        self.name = name

    def printName(self):
        print(self.name, self.age)



max_muster = TestClass("Max", 14)

max_muster.printName()