class Robot:
    def __init__(self, name, color, weight):
        self.name = name
        self.color = color
        self.weight = weight

    def introduce_self(self):
        print('My name is {name}'.format(name=self.name))


r1 = Robot("Tom", "red", 30)
r1.introduce_self()
