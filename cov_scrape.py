import requests
import csv
import schedule
from datetime import datetime, timedelta


class DATA:
    def __init__(self, country, date):
        pass


today = datetime.today()
date_string = today.strftime("%m-%d-%Y")

file_name = f"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/{date_string}.csv"
print(file_name)

res = requests.get(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-08-2020.csv")

data = csv.reader(res.text.splitlines())
yesterday = datetime.now() + timedelta(days=-1)
print(yesterday.strftime("%m-%d-%Y"))

for line in data:
    if "Switzerland" in line:
        print(line)
