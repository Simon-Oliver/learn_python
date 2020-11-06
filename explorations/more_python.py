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

# Create Employee Class


class Employee:
    raise_amt = 1.02

    def __init__(self, first, last, pay, title):
        self.first = first
        self.last = last
        self.pay = pay
        self.title = title
        self.email = "{}.{}@email.com".format(self.first, self.last)

    def __repr__(self):
        return "Employee('{}','{}','{}','{}')".format(self.first, self.last, self.pay, self.title)

    def __str__(self):
        return 'Test of string dunder'

    def fullname(self):
        return "{} {}".format(self.first, self.last)

    def apply_raise(self):
        self.pay = self.pay * self.raise_amt

# Create Developer Class that inherits from Employee


class Developer(Employee):
    raise_amt = 4

    def __init__(self, first, last, pay, title, prog_lang):
        # super initiates the class with the props from the parent
        super().__init__(first, last, pay, title)
        self.prog_lang = prog_lang


# Create Manager Class
class Manager(Employee):
    raise_amt = 10

    def __init__(self, first, last, pay, title, level, team=None):
        super().__init__(first, last, pay, title)
        self.team = [] if team is None else team  # ternary operator expression
        self.level = level

    # adding employee
    def add_emp(self, emp):
        if emp not in self.team:
            self.team.append(emp)
        else:
            print(emp.first, "Is already added.")

    # removing employee
    def remove_emp(self, emp):
        if emp in self.team:
            self.team.remove(emp)
            print("Removed --->", emp.first)


# Create Developer Max Muster
emp_dev = Developer("Max", "Muster", 50000, "Junior Developer", "Python")

# Create Developer Jane Doe
emp_dev2 = Developer("Jane", "Doe", 80000, "Senior Developer", "C++")
print(emp_dev.title, emp_dev.pay)

# Apply raise defined in developer class
emp_dev.apply_raise()
print(emp_dev.title, emp_dev.pay, emp_dev.prog_lang)

# Create Manager level 2
mngr_level2 = Manager("Boss", "Bossmann", 300000, "Manager", 2)

print("Team size", len(mngr_level2.team))

# Add employee (dev) to Manager Team
mngr_level2.add_emp(emp_dev)

# Add employee (dev2) to Mangaer Team
mngr_level2.add_emp(emp_dev2)
print(mngr_level2.email)
print("Team size", len(mngr_level2.team))

# Duplicate employee in team to see if this is handeld properly
mngr_level2.add_emp(emp_dev)

# Print all team members from Manager Lever 2
for emp in mngr_level2.team:
    print(emp.first)

# Remove team member from Manager 2 Team
mngr_level2.remove_emp(emp_dev)


print(isinstance(emp_dev, Employee))
print(isinstance(mngr_level2, Employee))
print(issubclass(Manager, Employee))

print(str(emp_dev))


class Animal:
    def __init__(self, name, species, food):
        self.name = name
        self.species = species
        self.food = food

    def talk(self):
        print("roooar")


class Dog(Animal):
    def __init__(self, name, species, food):
        super().__init__(name, species, food)

    def talk(self):
        print("Wooof")


class CourseInternal:
    def __init__(self, name, max_participants):
        self.name = name
        self.students = []
        self.max_participants = max_participants


    def add_student(self,student):
        if len(self.students) < self.max_participants:
            self.students.append(student)
            return True
        return False

    def get_enrolled_students(self):
        enrolled = []
        for student in self.students:
            enrolled.append(student.first)
        return enrolled


it_onboarding = CourseInternal("IT Onboarding", 3)

it_onboarding.add_student(emp_dev)
it_onboarding.add_student(emp_dev2)

print(it_onboarding.get_enrolled_students())

rex = Dog('Rex', "dog", "Fish")
rex.talk()


