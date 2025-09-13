from flask import Flask
from flask_cors import CORS

from routes.api import api
from models.data import db

def create_app():
    app = Flask(__name__)

    db.init_app(app)
    CORS(app)

    # Blueprint for basic api routes
    app.register_blueprint(api, url_prefix='/api')

    return app

if __name__ == '__main__':
    create_app().run(debug=True)