import requests
import json

url = "https://maker.ifttt.com/trigger/notification_triggered/with/key/n24IkNJk6DKZCBvZfbzypIHsnY4GA0qZbXu-dj2dP_v"

data = {'value1': 'Its working'}
headers = {'Content-type': 'application/json'}
r = requests.post(url, json=data, headers=headers)
print(r.status_code)

# requests.post(url)
