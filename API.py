from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from data import *

app = Flask(__name__)
app.config["DEBUG"] = True


@app.route('/questions-info', methods=['GET'])
def get_all_tasks():
    beautiful = session.query(BeautifulSolution).all()
    return jsonify(beautiful)


@app.route('/solution-questions/<int:task_id>', methods=['POST'])
def check_user_result(task_id):
    user_result = {}
    letters = request.args.getlist('char')
    numbers = request.args.getlist('value')
    for index in range(len(letters)):
        user_result[letters[index]] = numbers[index]
    obj = session.query(BeautifulSolution).filter_by(id=task_id).first()
    if obj.solution1 == user_result:
        session.query(BeautifulSolution).filter_by(id=task_id).first().update(
            {BeautifulSolution.solvedCount: BeautifulSolution.solvedCount + 1})
        return 200
    else:
        return 400


@app.route('/try-questions/<int:task_id>', methods=['POST'])
def increase_solving_attempts(task_id):
    session.query(BeautifulSolution).filter_by(id=task_id).first().update(
        {BeautifulSolution.triedCount: BeautifulSolution.triedCount + 1})



@app.route('/like-questions/<int:task_id>', methods=['POST'])
def increase_likes(task_id):
    session.query(BeautifulSolution).filter_by(id=task_id).first().update(
        {BeautifulSolution.likeCount: BeautifulSolution.likeCount + 1})


@app.route('/questions-info/<int:task_id>', methods=['GET'])
def get_task_name(task_id):
    obj = session.query(BeautifulSolution).filter_by(id=task_id).first()
    result = {'addition1': obj.add1, 'addition2': obj.add2, 'sum': obj.sum}
    return jsonify(result)



# todo for Ihor: you should manage links in paths


app.run()
