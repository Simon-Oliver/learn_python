f = open('sample.txt')

# for line in f:
#     num = line.split()
#     print(num[0])

# thisdict = {
#     "brand": "Ford",
#     "model": "Mustang",
#     "year": 1964
# }

# for k, v in thisdict.items():
#     print(k, v)


class Employee:

    rais_amount = 0

    def __init__(self, name, age, wage):
        self.name = name
        self.age = age
        self.wage = wage

    @classmethod
    def set_raise(cls, amount):
        cls.rais_amount = amount

    @classmethod
    def from_string(cls, string):
        name, age, wage = string.split('-')
        return cls(name, age, wage)


emp1 = Employee("Max", 28, 90000)

print(emp1.rais_amount)
Employee.set_raise(15)
print(emp1.rais_amount)
emp2 = Employee.from_string('Anna-23-60000')
print(emp2.name, emp2.age)
