from icalendar import Calendar, Event
from datetime import date, datetime, time, timedelta
import dateutil.parser
from dateutil import relativedelta
import pytz
import json
import pprint
import csv


class Parser:
    def __init__(self, file):
        self.data = self.parse_ical(file)

    def parse_ical(self, flocation):
        cet = pytz.country_timezones('ch')

        g = open(flocation, 'rb')

        arr = []

        gcal = Calendar.from_ical(g.read())
        for component in gcal.walk():
            obj = {}
            keys = ['DTEND', 'DTSTART',
                    'ATTENDEE', 'LOCATION', "MY_PARTSTAT", "SUMMARY", "STATUS"]
            # Get Vevent as this holds all of the individual calender items
            if component.name == "VEVENT":
                # iterate over all of the keys - this is important as not every item has the same keys
                for k in component.keys():
                    if k in keys:
                        # get all the dates and convert them to strings
                        if k == 'DTEND' or k == 'DTSTAMP' or k == 'DTSTART' or k == 'LAST-MODIFIED' or k == 'CREATED':
                            new_dt = str(component.get(k).dt)[:19]
                            obj[k] = dateutil.parser.isoparse(new_dt)
                        # Locations is used by zoom to store a zoom link
                        # If there is a zoom link just append zoom otherwise add location to array
                        elif k == 'LOCATION':
                            obj[k] = []
                            for l in component.get(k).split(", "):
                                if "zoom.us" in str(l) and len(component.get(k).split(", ")) == 1:
                                    obj[k].append("zoom")
                        # Clean attendee list by only storing email address
                        elif k == 'ATTENDEE':
                            obj[k] = []
                            for e in component.get(k):
                                if e.replace("mailto:", "") == str(gcal["X-WR-CALNAME"]) and hasattr(e, 'params'):
                                    # print("-", e.replace("mailto:", ""))
                                    obj["MY_PARTSTAT"] = str(
                                        e.params["PARTSTAT"])
                                    obj[k].append(e.replace("mailto:", ""))
                                elif len(e) > 1:
                                    # print("-", e.replace("mailto:", ""))
                                    obj[k].append(e.replace("mailto:", ""))

                        else:
                            obj[k] = str(component.get(k))

            arr.append(obj)

        g.close()
        return arr

    def get_data(self):
        return self.data

    def get_timedelta(self, dtstart, dtend):
        timedelta = []
        # convert date string to date object
        sdate = datetime.strptime(dtstart, '%Y-%m-%d')
        edate = datetime.strptime(dtend, '%Y-%m-%d')
        # iterate over parsed calendar events and retrun if they are between two dates
        for e in self.data:
            if "DTSTART" in e:
                 # e["DTSTART"][:10] is shorting date string such as '2020-10-13 12:45:00+00:00' to '2020-10-13'
                timestr = datetime.strptime(
                    str(e["DTSTART"])[: 10], '%Y-%m-%d')
                if "DTSTART" in e and timestr.date() >= sdate.date() and timestr.date() <= edate.date():
                    timedelta.append(e)
        return timedelta

    def save_csv(self, arr):
        csv_file = "cal_data.csv"
        csv_columns = ['DTEND', 'DTSTART',
                       'ATTENDEE', 'LOCATION', "MY_PARTSTAT", "SUMMARY", "STATUS"]
        try:
            with open(csv_file, 'w') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
                writer.writeheader()
                for data in arr:
                    writer.writerow(data)

        except IOError:
            print("I/O error")

    # timeSum = timedelta(0)


test_cal = Parser('/Users/Simon/Downloads/test/test2.ics')

# for i in arr:
#     if "duration" in i:
#         timeSum = timeSum + i["duration"]


# def counts(my_list):
#     meeting_totals = {}
#     for meeting in my_list:
#         if "duration" in meeting and "ACCEPTED" in meeting.values():
#             meeting_totals[meeting["summary"]] = meeting_totals.get(
#                 meeting["summary"], 0) + 1
#     return meeting_totals


# def sum_time(my_list):
#     meeting_totals = {}
#     for meeting in my_list:
#         if "duration" in meeting and "ACCEPTED" in meeting.values():
#             meeting_totals[meeting["summary"]] = meeting_totals.get(
#                 meeting["summary"], timedelta(0)) + meeting["duration"]
#     return meeting_totals


# def sum_attendees(my_list, atCount=None):
#     meeting_totals = {}
#     for meeting in my_list:
#         if "duration" in meeting and "ACCEPTED" in meeting.values():
#             if atCount is None:
#                 for at in meeting["attendees"]:
#                     meeting_totals[at] = meeting_totals.get(
#                         at, 0) + 1
#                     print(at)
#             else:
#                 if len(meeting["attendees"]) <= atCount:
#                     print(meeting["attendees"])
#                     for at in meeting["attendees"]:
#                         meeting_totals[at] = meeting_totals.get(
#                             at, 0) + 1
#     return meeting_totals


# def count_by_attendees(my_list, atCount=None):
#     meeting_totals = {}
#     for meeting in my_list:
#         if "duration" in meeting and "ACCEPTED" in meeting.values():
#             if atCount is None:
#                 meeting_totals[meeting["summary"]] = meeting_totals.get(
#                     meeting["summary"], 0) + 1
#             else:
#                 if len(meeting["attendees"]) <= atCount:
#                     meeting_totals[meeting["summary"]] = meeting_totals.get(
#                         meeting["summary"], 0) + 1

#     return meeting_totals


# arr1 = counts(arr)
# arr2 = sum_time(arr)
# arr3 = sum_attendees(arr, 1)
# arr4 = count_by_attendees(arr, 5)
# print(arr3)

# today = datetime.utcnow()


# def return_before_after(my_list, dtstart, dtend):
#     newArr = []
#     sdate = datetime.strptime(dtstart, '%Y-%m-%d')
#     edate = datetime.strptime(dtend, '%Y-%m-%d')
#     for e in my_list:
#         if "DTSTART" in e and hasattr(e["DTSTART"], "date") and e["DTSTART"].date() >= sdate.date() and e["DTSTART"].date() <= edate.date():
#             print(e["summary"], e["DTSTART"].date(),
#                   e["DTSTART"].date() > sdate.date())
#             newArr.append(e)
#     return newArr


# largeMeetings = count_by_attendees(arr, 3)

# arrBA = return_before_after(largeMeetings, "2020-01-01", "2020-09-25")

# print(arrBA)
# print(sum_time(arrBA))

test_cal.save_csv(test_cal.get_timedelta("2020-01-01", "2020-09-25"))
# pprint.pprint(test_cal.data)

print(len(test_cal.get_timedelta("2020-01-01", "2020-09-25")))

# --------------------------
# with open('cal.json', 'w') as outfile:
#     json.dump(arr, outfile)

# ------------------------------
# for key in arr1:
#     print(key, "|", arr1[key], "|", arr2[key])


# if "duration" in meeting and "ACCEPTED" in meeting.values():
#             if meeting_totals[meeting["summary"]] is None:
#                 meeting_totals[meeting["summary"]] = [1, meeting["duration"]]
#             else:
#                 meeting_totals[meeting["summary"]] = [meeting_totals.get(
#                     meeting["summary"][0]) + 1, meeting_totals.get(
#                     meeting["summary"][1]) + meeting["duration"]]
