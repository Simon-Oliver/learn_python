class Customer:
    def __init__(self, name, membership, job):
        self.name = name
        self.membership = membership
        self.job = job

    def print_name():
        print(f"{self.name} {self.membership}")


class Job:
    def __init__(self, title, wage):
        self.title = title
        self.wage = wage


j = Job("Chef", 50000)

c = Customer("Oliver", "Gold", j)
print(c.job.wage)
