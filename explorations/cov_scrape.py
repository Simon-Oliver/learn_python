import requests
import csv
import schedule
from datetime import datetime, timedelta


class DATA:
    def __init__(self, country=None):
        self.country = country
        self.today = datetime.today()
        self.yesterday = datetime.now() + timedelta(days=-1)

    @staticmethod
    def get_date_str():
        return date.strftime("%m-%d-%Y")

    @staticmethod
    def get_file_name():
        pass


today = datetime.today()
date_string = today.strftime("%m-%d-%Y")
yesterday = datetime.now() + timedelta(days=-1)
date_string_yesterday = yesterday.strftime("%m-%d-%Y")

file_name_today = f"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/{date_string}.csv"
file_name_yesterday = f"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/{date_string_yesterday}.csv"


# res = requests.get(
#     "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-08-2020.csv")

res = requests.get(file_name_today)

if res.status_code != 200:
    res = requests.get(file_name_yesterday)


data = csv.reader(res.text.splitlines())

print(res)

for line in data:
    if "Switzerland" in line:
        print(line)

newD = DATA()
