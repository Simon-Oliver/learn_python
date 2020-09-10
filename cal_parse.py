from icalendar import Calendar, Event
from datetime import date, datetime, time, timedelta

g = open('/Users/Simon/Downloads/test/test.ics', 'rb')

arr = []

gcal = Calendar.from_ical(g.read())
for component in gcal.walk():
    obj = {}
    if component.name == "VEVENT":
        if component.get('ATTENDEE') is None:
            obj["summary"] = component.get('summary')
            #print(component.get('summary'), "-----", 0)
        else:
            print(component.get('summary'), component.get(
                'DTEND').dt - component.get('DTSTART').dt)
            obj["summary"] = str(component.get('summary'))
            obj["DTSTART"] = str(component.get('DTSTART').dt)
            obj["DTEND"] = str(component.get('DTEND').dt)
            obj["duration"] = component.get(
                'DTEND').dt - component.get('DTSTART').dt
            obj["attendees"] = []
            for e in component.get('ATTENDEE'):
                if e.replace("mailto:", "") == str(gcal["X-WR-CALNAME"]) and hasattr(e, 'params'):
                    #print("-", e.replace("mailto:", ""))
                    obj["my_partstat"] = str(e.params["PARTSTAT"])
                    # print(e.params["PARTSTAT"])
                else:
                    #print("-", e.replace("mailto:", ""))
                    obj["attendees"].append(e.replace("mailto:", ""))
    arr.append(obj)

g.close()

timeSum = timedelta(0)

for i in arr:
    if "duration" in i:
        timeSum = timeSum + i["duration"]


def counts(my_list):
    meeting_totals = {}
    for meeting in my_list:
        if "duration" in meeting and "ACCEPTED" in meeting.values():
            meeting_totals[meeting["summary"]] = meeting_totals.get(
                meeting["summary"], 0) + 1
    return meeting_totals


def sum_time(my_list):
    meeting_totals = {}
    for meeting in my_list:
        if "duration" in meeting and "ACCEPTED" in meeting.values():
            meeting_totals[meeting["summary"]] = meeting_totals.get(
                meeting["summary"], timedelta(0)) + meeting["duration"]
    return meeting_totals


arr1 = counts(arr)
arr2 = sum_time(arr)

for key in arr1:
    print(key, "|", arr1[key], "|", arr2[key])


# if "duration" in meeting and "ACCEPTED" in meeting.values():
#             if meeting_totals[meeting["summary"]] is None:
#                 meeting_totals[meeting["summary"]] = [1, meeting["duration"]]
#             else:
#                 meeting_totals[meeting["summary"]] = [meeting_totals.get(
#                     meeting["summary"][0]) + 1, meeting_totals.get(
#                     meeting["summary"][1]) + meeting["duration"]]
