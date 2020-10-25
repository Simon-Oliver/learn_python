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


class Employee:
    raise_amt = 1.02

    def __init__(self, first, last, pay, title):
        self.first = first
        self.last = last
        self.pay = pay
        self.title = title
        self.email = "{}.{}@email.com".format(self.first,self.last)

    def fullname(self):
        return "{} {}".format(self.first,self.last)

    def apply_raise(self):
        self.pay = self.pay * self.raise_amt


class Developer(Employee):
    raise_amt = 4
    def __init__(self, first, last, pay, title, prog_lang):
        super().__init__(first, last, pay, title)
        self.prog_lang = prog_lang

class Manager(Employee):
    raise_amt = 10
    def __init__(self, first, last, pay, title, level,team=None):
        super().__init__(first, last, pay, title)
        self.team = [] if team is None else team # ternary operator expression
        self.level = level


    def add_emp(self, emp):
        if emp not in self.team:
            self.team.append(emp)
        else:
            print(emp.first, "Is already added.")

    def remove_emp(self, emp):
        if emp in self.team:
            self.team.remove(emp)
            print("Removed --->", emp.name)
        

emp_dev = Developer("Max", "Muster", 50000, "Junior Developer", "Python")
emp_dev2 = Developer("Jane", "Doe", 80000, "Senior Developer", "C++")
print(emp_dev.title ,emp_dev.pay)
emp_dev.apply_raise()
print(emp_dev.title ,emp_dev.pay, emp_dev.prog_lang)

mngr_level1 = Manager("Boss", "Bossmann", 300000, "Manager", 2)

print("Team size", len(mngr_level1.team))

mngr_level1.add_emp(emp_dev)
mngr_level1.add_emp(emp_dev2)
print(mngr_level1.email)
print("Team size", len(mngr_level1.team))
mngr_level1.add_emp(emp_dev)
mngr_level1.remove_emp(emp_dev)

for emp in mngr_level1.team:
    print(emp.first)