class Customer:
    def __init__(self, name, membership):
        self.name = name
        self.membership = membership

    def print_name(self):
        print(f"{self.name} {self.membership}")


c = Customer("Oliver", "Gold")
c.print_name()
