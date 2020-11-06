class Student:
    def __init__(self, name, age ,grade):
        self.name = name
        self.age = age
        self.grade = grade

class Course:
    def __init__(self, name, max_pax):
        self.name = name
        self.max_pax = max_pax
        self.students = []

    def add_student(self, student):
        if len(self.students) < self.max_pax:
            self.students.append(student)
            return True
        return False

    def get_average_grade(self):
        sum_grade = 0
        for s in self.students:
            sum_grade += s.grade
        return sum_grade / len(self.students)


s1 = Student("Max Muster", 28, 10)
s2 = Student("Oliver Müller", 22, 2)
s3 = Student("James Cooper",26, 8)

course_it = Course("Computer Sience", 2)
course_it.add_student(s1)
course_it.add_student(s2)
print(course_it.add_student(s3))
print(course_it.get_average_grade())