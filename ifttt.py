import requests
import json
import schedule
import time

url = "https://maker.ifttt.com/trigger/notification_triggered/with/key/n24IkNJk6DKZCBvZfbzypIHsnY4GA0qZbXu-dj2dP_v"


# requests.post(url)


def job():
    data = {'value1': 'Its working'}
    headers = {'Content-type': 'application/json'}
    r = requests.post(url, json=data, headers=headers)
    print(r.status_code)


# schedule.every().hour.do(job)
# schedule.every().day.at("10:30").do(job)
# schedule.every(5).to(10).minutes.do(job)
# schedule.every().monday.do(job)
# schedule.every().wednesday.at("13:15").do(job)
# schedule.every().minute.at(":17").do(job)

job()
schedule.every(1).minutes.do(job)

while True:
    schedule.run_pending()
    time.sleep(1)
