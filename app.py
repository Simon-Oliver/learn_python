from flask import Flask, jsonify, request, make_response
# import cpu_temp
# import temp_sensor
# import psutil
from flask_cors import CORS
import requests
from xml.etree import ElementTree
app = Flask(__name__)
CORS(app)


# @app.route('/')
# def index():
#     cpu = cpu_temp.read_temp()
#     response = jsonify({'temp': cpu, 'percent': psutil.cpu_percent()})
#     response.headers.add('Access-Control-Allow.Origin', '*')
#     response.headers.add('Content-Type', 'application/json')
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     response.headers.add('Access-Control-Allow-Methods',
#                          'PUT, GET, POST, DELETE, OPTIONS')
#     response.headers.add('Access-Control-Allow-Headers',
#                          'Content-Type,Authorization')
#     response.headers.add('Access-Control-Expose-Headers',
#                          'Content-Type,Content-Length,Authorization,X-Pagination')
#     return response


# @app.route('/exchange')
# def exchange():
#     xml = requests.get(
#         'http://www.pwebapps.ezv.admin.ch/apps/rates/rate/getxml?activeSearchType=today')
#     tree = ElementTree.fromstring(xml.content)
#     for devise in tree.findall('{http://www.pwebapps.ezv.admin.ch/apps/rates}devise'):
#         name = devise.get('code')
#         kurs = devise.find(
#             '{http://www.pwebapps.ezv.admin.ch/apps/rates}kurs').text
#         if(name == 'aud'):
#             response = jsonify({'kurs': kurs})
#             response.headers.add('Access-Control-Allow.Origin', '*')
#             response.headers.add('Content-Type', 'application/json')
#             response.headers.add('Access-Control-Allow-Origin', '*')
#             response.headers.add('Access-Control-Allow-Methods',
#                                  'PUT, GET, POST, DELETE, OPTIONS')
#             response.headers.add(
#                 'Access-Control-Allow-Headers', 'Content-Type,Authorization')
#             response.headers.add('Access-Control-Expose-Headers',
#                                  'Content-Type,Content-Length,Authorization,X-Pagination')
#             return response


@app.route('/temp')
def temp():
    # temp = temp_sensor.read_temp()
    print("temp call")
    response = jsonify({'temp': "test"})
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


@app.route('/deg', methods=['POST'])
def deg():
    print(request.json)
    # if request.method == 'OPTIONS':
    #     print("Is options")
    #     return build_preflight_response()
    # elif request.method == 'POST':
    #     req = request.get_json()
    #     print(req)
    #     # query user with req['id']
    #     # for demonstration, we assume the username to be Eric
    #     return build_actual_response(jsonify({'name': 'Eric'}))

    # def build_preflight_response():
    #     response = make_response()
    #     response.headers.add('Access-Control-Allow.Origin', '*')
    #     response.headers.add('Content-Type', 'application/json')
    #     response.headers.add('Access-Control-Allow-Origin', '*')
    #     response.headers.add('Access-Control-Allow-Methods',
    #                          'PUT, GET, POST, DELETE, OPTIONS')
    #     response.headers.add('Access-Control-Allow-Headers',
    #                          'Content-Type,Authorization')
    #     response.headers.add('Access-Control-Expose-Headers',
    #                          'Content-Type,Content-Length,Authorization,X-Pagination')
    #     return response

    # def build_actual_response(response):
    #     response.headers.add('Access-Control-Allow.Origin', '*')
    #     response.headers.add('Content-Type', 'application/json')
    #     response.headers.add('Access-Control-Allow-Origin', '*')
    #     response.headers.add('Access-Control-Allow-Methods',
    #                          'PUT, GET, POST, DELETE, OPTIONS')
    #     response.headers.add('Access-Control-Allow-Headers',
    #                          'Content-Type,Authorization')
    #     response.headers.add('Access-Control-Expose-Headers',
    #                          'Content-Type,Content-Length,Authorization,X-Pagination')
    return "response"
