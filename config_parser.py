import json

with open("./config.json") as f:
    data = json.load(f)


class Settings:
    def __init__(self, color, text, isEnabled):
        self.color = color
        self.text = text
        self.isEnabled = isEnabled
        # **args catches extra arguments that haven't been specified in the function in a dict


def unpackJson(color, text, isEnabled, **args):
    set1 = Settings(color, text, isEnabled)
    try:
        print(args['notParsed2'])
        return set1
    except Exception as e:
        print(e)


# passes json as a dict
obj = unpackJson(**data)

print("-----", obj.color)
