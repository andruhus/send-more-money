from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from data import *

app = Flask(__name__)
app.config["DEBUG"] = True


@app.route('/questions-info', methods=['GET'])
def get_all_tasks():
    beautiful = session.query(BeautifulSolution).all()
    notbad = session.query(NotbadSolution).all()
    beautiful.extend(notbad)
    return jsonify(beautiful)


@app.route('/solution-questions/<int:task_id>', methods=['POST'])
def check_user_result(task_id):
    user_result = {}
    letters = request.args.getlist('char')
    numbers = request.args.getlist('value')
    for index in range(len(letters)):
        user_result[letters[index]] = numbers[index]
    if task_id >= session.query(BeautifulSolution).count():
        obj = session.query(NotbadSolution).filter_by(id=task_id).first()
        if obj.solution1 == user_result or obj.solution2 == user_result or obj.solution3 == user_result or obj.solution4 == user_result or obj.solution5 == user_result:
            session.query(NotbadSolution).filter_by(id=task_id).first().update(
                {NotbadSolution.solvedCount: NotbadSolution.solvedCount + 1})
            return 200
        else:
            return 400
    else:
        obj = session.query(BeautifulSolution).filter_by(id=task_id).first()
        if obj.solution1 == user_result:
            session.query(BeautifulSolution).filter_by(id=task_id).first().update(
                {BeautifulSolution.solvedCount: BeautifulSolution.solvedCount + 1})
            return 200
        else:
            return 400


@app.route('/try-questions/<int:task_id>', methods=['POST'])
def increase_solving_attempts(task_id):
    if task_id < session.query(BeautifulSolution).count():
        session.query(BeautifulSolution).filter_by(id=task_id).first().update(
            {BeautifulSolution.triedCount: BeautifulSolution.triedCount + 1})
    else:
        session.query(NotbadSolution).filter_by(id=task_id).first().update(
            {NotbadSolution.triedCount: NotbadSolution.triedCount + 1})


@app.route('/like-questions/<int:task_id>', methods=['POST'])
def increase_likes(task_id):
    if task_id < session.query(BeautifulSolution).count():
        session.query(BeautifulSolution).filter_by(id=task_id).first().update(
            {BeautifulSolution.likeCount: BeautifulSolution.likeCount + 1})
    else:
        session.query(NotbadSolution).filter_by(id=task_id).first().update(
            {NotbadSolution.likeCount: NotbadSolution.likeCount + 1})


@app.route('/questions-info/<int:task_id>', methods=['GET'])
def get_task_name(task_id):
    if task_id < session.query(BeautifulSolution).count():
        obj = session.query(BeautifulSolution).filter_by(id=task_id).first()
        result = {'addition1': obj.add1, 'addition2': obj.add2, 'sum': obj.sum}
        return jsonify(result)
    else:
        obj = session.query(NotbadSolution).filter_by(id=task_id).first()
        result = {'addition1': obj.add1, 'addition2': obj.add2, 'sum': obj.sum}
        return jsonify(result)


# todo for Ihor: you should manage links in paths


app.run()
