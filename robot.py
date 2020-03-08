class Robot:
    def __init__(self, name, color, weight):
        self.name = name
        self.color = color
        self.weight = weight

    def introduce_self(self):
        name = self.key()
        print(f'My name is {name}')


r1 = Robot("Tom", "red", 30)
r1.introduce_self()
