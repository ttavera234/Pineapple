from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'secret_key_goes_here'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:coqki2-civped-fenjAg@localhost:5432/pineapple'

    db.init_app(app)
    CORS(app)

    # Blueprint for auth routes in application
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    # Blueprint for non auth routes in application
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
