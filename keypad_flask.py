from flask import Flask, jsonify
import requests
app = Flask(__name__)

num = 0


@app.route('/')
def index():
    global num
    num += 1
    response = jsonify({'message': num})
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
