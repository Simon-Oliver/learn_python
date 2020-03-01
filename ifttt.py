import requests
import json
import schedule
import time

url = "https://maker.ifttt.com/trigger/notification_triggered/with/key/n24IkNJk6DKZCBvZfbzypIHsnY4GA0qZbXu-dj2dP_v"


# requests.post(url)


def job():
    data = {'value1': """Aktuelle Situation Schweiz
Aufgrund der aktuellen Situation und der Ausbreitung des Coronavirus stuft der Bundesrat die Situation in der Schweiz als besondere Lage gemäss Epidemiengesetz ein. Er verbietet Grossveranstaltungen mit mehr als 1000 Personen. Dieses Verbot tritt sofort in Kraft und gilt mindestens bis am 15. März 2020. Über Veranstaltungen mit weniger als 1000 Teilnehmenden entscheiden die kantonalen Behörden. Informationen dazu finden Sie unter «Verbot von Grossveranstaltungen»

Durch diese Massnahme soll die Verbreitung des Coronavirus in der Schweiz eingedämmt werden.

Stand: 1. März 2020, 17.30 Uhr: Das Referenzlabor für neu auftretende Viruserkrankungen (NAVI) in Genf hat in der Schweiz in 24 Fällen Ansteckungen mit dem neuen Coronavirus bestätigt. Meldungen zu Erkrankungen liegen vor aus den Kantonen: Aargau, Baselland, Basel-Stadt, Bern, Freiburg, Genf, Graubünden, Tessin, Waadt, Wallis und Zürich. Alle Erkrankten sind isoliert. Die Gesundheitsbehörden benachrichtigen enge Kontaktpersonen.

Bisher wurden mehr als 1300 Personen mit Verdacht auf das neue Coronavirus abgeklärt. Dabei wurden Abstriche aus Nase und Hals in Diagnose-Labors untersucht. Mehrere Personen sind in ihrem Wohnkanton in Quarantäne. Sie müssen in ihrer Wohnung bleiben und den Kontakt zu anderen vermeiden."""}
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
# schedule.every().day.at("10:07").do(job)

while True:
    schedule.run_pending()
    time.sleep(1)
