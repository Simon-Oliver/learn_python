from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

try:
    @app.route('/test')
    def temp():
        # temp = temp_sensor.read_temp()
        print("test call")
        response = jsonify({'data': "test"})
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



