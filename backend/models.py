from . import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), unique=True)
    password = db.Column(db.String(250))
    name = db.Column(db.String(250))

    def __repr__(self):
        return f"ID: {self.id}\nEmail: {self.email}\nPassword: {self.password}\nName: {self.name}"

    def __init__(self, email, password, name):
        self.email = email
        self.password = password
        self.name = name