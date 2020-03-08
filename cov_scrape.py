import requests
import csv
import datetime
import schedule

class DATA:
    def __init__(self, country, date):
        pass

today = datetime.date.today()
date_string = today.strftime("%m-%d-%Y")

file_name = f"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/{date_string}.csv"
print(file_name)

# res = requests.get("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-07-2020.csv")

# data = csv.reader(res.text.splitlines())


# for line in data:
#     if "Switzerland" in line:
#         print(line)