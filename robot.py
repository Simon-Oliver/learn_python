class Robot:
    def __init__(self, name, color, weight):
        self.name = name
        self.color = color
        self.weight = weight

    def introduce_self(self):
        print(f'My name is {self.name}')

    def format_str(self):
        formatted = f"--------------{self.name}--------------"
        return formatted

    def write_to_f(self, str, filename, format):
        f = open(f"./{filename}.{format}", "a")
        f.write(str)

        # Close the file
        f.close()


r1 = Robot("Tom", "red", 30)
r1.introduce_self()
print(r1.format_str())
r1.write_to_f(r1.format_str(), "test", "txt")
