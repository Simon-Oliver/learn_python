import RPi.GPIO as gpio
import time
from flask import Flask, jsonify, request, make_response
# import cpu_temp
# import temp_sensor
# import psutil
from flask_cors import CORS
import requests
from xml.etree import ElementTree
import pigpio
app = Flask(__name__)
CORS(app)


# Callculating angle from duty cycle (angle/180 × 10) + 2
# (0/180×10)+2 = 2
# (180/180×10)+2 = 12
# (90/180×10)+2 = 7

servo = 18
# gpio.setmode(gpio.BCM)
# gpio.setup(servo, gpio.OUT)

# p = gpio.PWM(servo, 50)
# p.start(0)

pwm = pigpio.pi()
pwm.set_mode(servo, pigpio.OUTPUT)

pwm.set_PWM_frequency(servo, 50)

try:

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
        print(request.json["deg"])
        angle = request.json["deg"]

        pulseWidth = 500 + (angle * ((2400 - 500) / 181))
        dutyCycle = pulseWidth / 20000

        # duty_cylce = (angle / 180 * 10) + 2.5
        if(dutyCycle < 2.5):
            dutyCycle = 2.5
        print(dutyCycle)
        pwm.set_servo_pulsewidth(servo, pulseWidth)
        # p.ChangeDutyCycle(dutyCycle)
        time.sleep(0.3)

        # duty_cylce = (angle / 180 * 10) + 2.5
        # if(duty_cylce < 2.5):
        #     duty_cylce = 2.5
        # print(duty_cylce)
        # p.ChangeDutyCycle(duty_cylce)
        # time.sleep(0.3)

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


except KeyboardInterrupt:
    pwm.set_PWM_dutycycle(servo, 0)
    pwm.set_PWM_frequency(servo, 0)

    # p.ChangeDutyCycle(2.5)
    # time.sleep(1)
    # p.stop()
    gpio.cleanup()
