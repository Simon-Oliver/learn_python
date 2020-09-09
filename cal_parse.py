from icalendar import Calendar, Event
from datetime import datetime

g = open('/Users/Simon/Downloads/test/test.ics', 'rb')

arr = []

gcal = Calendar.from_ical(g.read())
for component in gcal.walk():
    obj = {}
    if component.name == "VEVENT":
        if component.get('ATTENDEE') is None:
            obj["summary"] = component.get('summary')
            print(component.get('summary'), "-----", 0)
        else:
            print(component.get('summary'))
            obj["summary"] = str(component.get('summary'))
            obj["attendees"] = []
            for e in component.get('ATTENDEE'):
                if e.replace("mailto:", "") == "simon.stauffer@beekeeper.io" and hasattr(e, 'params'):
                    print("-", e.replace("mailto:", ""))
                    obj["my_partstat"] = str(e.params["PARTSTAT"])
                    print(e.params["PARTSTAT"])
                else:
                    print("-", e.replace("mailto:", ""))
                    obj["attendees"].append(e.replace("mailto:", ""))
    arr.append(obj)


g.close()
print(arr)
