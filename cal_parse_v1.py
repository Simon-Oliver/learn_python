from icalendar import Calendar, Event
from datetime import date, datetime, time, timedelta
import dateutil.parser
import pytz
import pprint
import json
import jicson


with open("cal.json", "r") as read_file:
    data = json.load(read_file)


for e in data['VCALENDAR'][0]['VEVENT']:
    if "DTSTART" and "ATTENDEE" in e.keys():
        print(e['SUMMARY'], dateutil.parser.parse(e['DTSTART']), e['ATTENDEE'])

print(data['VCALENDAR'][0]['VEVENT'][0].keys())

# read from file
# result = jicson.fromFile('/Users/Simon/Downloads/test/test2.ics')
# with open('cal2.json', 'w') as outfile:
#     json.dump(result, outfile)

# pprint.pprint(result)

# # read from text
# result = jicson.fromText(icsText)
# print(result)

# # read from web
# result = jicson.fromWeb(url, auth=base64_authtoken)
# print(result)


# cet = pytz.country_timezones('ch')

# g = open('/Users/Simon/Downloads/test/test.ics', 'rb')

# arr = []

# gcal = Calendar.from_ical(g.read())
# for component in gcal.walk():
#     if component.name == "VEVENT":
#         pprint.pprint(str(component.get('SUMMARY')))
