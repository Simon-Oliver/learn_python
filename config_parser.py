import json

with open("./config.json") as f:
    data = json.load(f)


def unpackJson(color, text, isEnabled, **args):
    print(color)
    print(text)
    try:
        print(args['notParsed2'])
    except Exception as e:
        print(e)


unpackJson(**data)
