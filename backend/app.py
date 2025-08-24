from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:coqki2-civped-fenjAg@localhost:5432/pineapple'
db = SQLAlchemy(app)

class Meal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    calories = db.Column(db.Integer, nullable=False, default=0)
    fat = db.Column(db.Integer, nullable=False, default=0)
    carbs = db.Column(db.Integer, nullable=False, default=0)
    protein = db.Column(db.Integer, nullable=False, default=0)

    def __repr__(self):
        return f"Calories: {self.calories}\nFat: {self.fat}\nCarbs: {self.carbs}\nProtein: {self.protein}"

    def __init__(self, calories, fat, carbs, protein):
        self.calories = calories
        self.fat = fat
        self.carbs = carbs
        self.protein = protein

def format_meal(meal):
    return {
        "id": meal.id,
        "calories": meal.calories,
        "fat": meal.fat,
        "carbs": meal.carbs,
        "protein": meal.protein
    }
@app.route('/')
def hello():
    return "Hey!"

@app.route('/meal', methods = ['POST'])
def create_meal():
    calories = request.json['calories']
    fat = request.json['fat']
    carbs = request.json['carbs']
    protein = request.json['protein']
    meal = Meal(calories, fat, carbs, protein)
    db.session.add(meal)
    db.session.commit()
    return format_meal(meal)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

