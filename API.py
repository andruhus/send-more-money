from flask import Flask
from flask_restful import Resource, Api
from data import *

app = Flask(__name__)
app.config["DEBUG"] = True
api = Api(app)


class Home(Resource):
    pass


class ListView(Resource):
    def get(self):
        beautiful = session.query(BeautifulSolution).all()
        notbad = session.query(NotbadSolution).all()
        beautiful.extend(notbad)
        return beautiful


class InterActive(Resource):
    pass


# todo for Ihor: you should manage links in paths
api.add_resource(Home, '/')
api.add_resource(ListView, '/questions-info/')
api.add_resource(InterActive, '/interactive/<int: id>')

app.run()
