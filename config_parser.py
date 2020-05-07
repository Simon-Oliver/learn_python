import json

with open("./config.json") as f:
    data = json.load(f)


def unpackJson(color, text, isEnabled):
    print(color)
    print(text)


unpackJson(**data)
