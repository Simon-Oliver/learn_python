class GradeSystem:
    def calculate_grade(self,students):
        print("Calculating Grade")
        print("=================")
        for student in students:
            print(f'Grade for: {student.name}')
            print(f'– Check grade: {student.calculate_grade()}')

class Student:
    def __init__(self, name, age ,grade):
        self.name = name
        self.age = age
        self.grade = grade

class CalculateStandartStudent(Student):
    def __init__(self, name, age ,grade):
        super().__init__(name, age ,grade)

    def calculate_grade(self):
        return self.grade * 500

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


s1 = CalculateStandartStudent("Max Muster", 28, 10)
s2 = CalculateStandartStudent("Oliver Müller", 22, 2)
s3 = CalculateStandartStudent("James Cooper",26, 8)

course_it = Course("Computer Sience", 2)
course_it.add_student(s1)
course_it.add_student(s2)
print(course_it.add_student(s3))
print(course_it.get_average_grade())

calculate_grade = GradeSystem()
calculate_grade.calculate_grade([s1,s2,s3])