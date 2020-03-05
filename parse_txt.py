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
        self.email = name + "@company.com"

    @classmethod
    def set_raise(cls, amount):
        cls.rais_amount = amount

    @classmethod
    def from_string(cls, string):
        name, age, wage = string.split('-')
        return cls(name, age, wage)


class Manager(Employee):
    def __init__(self, name, age, wage, staff=None):
        super().__init__(name, age, wage)
        if staff is None:
            self.staff = []
        else:
            self.staff = staff


emp1 = Employee("Max", 28, 90000)
emp2 = Employee("Ben", 98, 10000)
mngr = Manager("Manager123", 22, 8888888, ["Corey", "Linda"])

print(emp1.email)
print(emp2.email)
print(mngr.staff)
