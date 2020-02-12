from flask import Flask
from ran_num import make_random_num
app = Flask(__name__)


@app.route('/')
def index():
   num = make_random_num()
   return {'number': num}
@app.route('/recipes')
def recipes():
  return {
    'title': 'Smoked Salmon Chowder',
    'ingredients': 'salmon, milk, bacon'
  }





