from flask import Flask, jsonify
import cpu_temp
import psutil
import requests
from xml.etree import ElementTree
app = Flask(__name__)


@app.route('/')
def index():
    cpu = cpu_temp.read_temp()
    response = jsonify({'temp': cpu, 'percent': psutil.cpu_percent()})
    response.headers.add('Access-Control-Allow.Origin', '*')
    response.headers.add('Content-Type', 'application/json')
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods',
                         'PUT, GET, POST, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Expose-Headers',
                         'Content-Type,Content-Length,Authorization,X-Pagination')
    return response


@app.route('/exchange')
def exchange():
    xml = requests.get(
        'http://www.pwebapps.ezv.admin.ch/apps/rates/rate/getxml?activeSearchType=today')
    tree = ElementTree.fromstring(xml.content)
    for devise in tree.findall('{http://www.pwebapps.ezv.admin.ch/apps/rates}devise'):
        name = devise.get('code')
        kurs = devise.find(
            '{http://www.pwebapps.ezv.admin.ch/apps/rates}kurs').text
        if(name == 'aud'):
            response = jsonify({'kurs': kurs})
            response.headers.add('Access-Control-Allow.Origin', '*')
            response.headers.add('Content-Type', 'application/json')
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Methods',
                                 'PUT, GET, POST, DELETE, OPTIONS')
            response.headers.add(
                'Access-Control-Allow-Headers', 'Content-Type,Authorization')
            response.headers.add('Access-Control-Expose-Headers',
                                 'Content-Type,Content-Length,Authorization,X-Pagination')
            return response
