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
