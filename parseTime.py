from datetime import date, datetime, time, timedelta
import dateutil.parser

timeString = '20200911T173000'
strFormat = "yyyyMMdd'T'HHmmss"


print(dateutil.parser.parse(timeString))
