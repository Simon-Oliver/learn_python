import json

newArr =[]

with open('./car.json') as json_file:
    data = json.load(json_file)
    for p in data:
        try:
            if "0e8959c7-71eb-4c6a-9022-5898cc376897" in p["Categories"]:
                print(p["Link"])
                newArr.append("https://www.caritas.de" + p["Link"])
            # if "0e8959c7-71eb-4c6a-9022-5898cc376897" in p["Categories"]:
            #     newArr.append(p)
        except AttributeError:
            continue
        except TypeError:
            continue
        

print(len(newArr))

import json
with open('carLink.json', 'w') as f:
    json.dump(newArr, f)

