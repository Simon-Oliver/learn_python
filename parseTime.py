from datetime import date, datetime, time, timedelta
import dateutil.parser

timeString = '2020-10-13 12:45:00+00:00'
dateStr = "2020-10-13"
strFormat = "yyyyMMdd'T'HHmmss"

new_dt = timeString[:19]


# print(datetime.strptime(new_dt, '%Y-%m-%d'))
# print(new_dt)

print(dateutil.parser.isoparse(new_dt))
print(dateutil.parser.isoparse(dateStr))
