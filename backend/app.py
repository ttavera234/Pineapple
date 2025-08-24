from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# PostgreSQL connection string:
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:coqki2-civped-fenjAg@localhost:5432/Pineapple'

db = SQLAlchemy(app)

@app.route('/')
def hello():
    return "Hey!"

if __name__ == '__main__':
    app.run(debug=True)

