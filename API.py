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
    def post(self,task_id,user_result):
        if task_id >= session.query(BeautifulSolution).count():
            obj = session.query(NotbadSolution).filter_by(id = task_id).first()
            if obj.solution1 == user_result or obj.solution2 == user_result or obj.solution3 == user_result or obj.solution4 == user_result or obj.solution5 == user_result:
                session.query(NotbadSolution).filter_by(id=task_id).first().update({NotbadSolution.solvedCount: NotbadSolution.solvedCount + 1 })
                return 200
            else:
                return 400


# todo for Ihor: you should manage links in paths
api.add_resource(Home, '/')
api.add_resource(ListView, '/questions-info/')
api.add_resource(InterActive, '/solution-questions/<int:id>')

app.run()
