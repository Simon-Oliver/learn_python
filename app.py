from flask import Flask, jsonify
from ran_num import make_random_num
app = Flask(__name__)


@app.route('/')
def index():
    num = make_random_num()
    response = jsonify({'data': num})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/recipes')
def recipes():
    return {
        'title': 'Smoked Salmon Chowder',
        'ingredients': 'salmon, milk, bacon'
    }


import os
import time
import requests
from bs4 import BeautifulSoup
from xml.etree import ElementTree

html = requests.get('https://www.xe.com/currencyconverter/convert/?Amount=1&From=AUD&To=CHF',
                    headers={'User-agent': 'Mozilla/5.0'})
xml = requests.get(
    'http://www.pwebapps.ezv.admin.ch/apps/rates/rate/getxml?activeSearchType=today')
soup = BeautifulSoup(html.content, "html.parser")
num2 = soup.select_one('#main-heading')
tree = ElementTree.fromstring(xml.content)
print(tree)


def read_temp():
    dev = os.popen('/opt/vc/bin/vcgencmd measure_temp')
    cpu_temp_s = dev.read()[5:-3]  # top and tail string
    cpu_temp = float(cpu_temp_s)
    return cpu_temp
