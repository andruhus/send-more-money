from flask import Flask, request, jsonify, Response

from data import *

app = Flask(__name__)
app.config["DEBUG"] = True


@app.route('/questions-info', methods=['GET'])
def get_all_tasks():
    session = sessionmaker(bind=engine)()

    beautiful = session.query(BeautifulSolution).all()
    res = []
    for item in beautiful:
        res.append(item.to_dict())
    return jsonify(res)


@app.route('/solution-questions/<int:task_id>', methods=['POST'])
def check_user_result(task_id):
    session = sessionmaker(bind=engine)()
    if task_id > session.query(BeautifulSolution).count():
        return Response(status=404)
    data = request.get_json()['data']
    user_result = {}
    for item in data:
        user_result[item['char']] = item['value']
    obj = session.query(BeautifulSolution).filter_by(id=task_id).first()
    if obj.solution == user_result:
        session.query(BeautifulSolution).filter_by(id=task_id).update(
            {BeautifulSolution.solvedCount: BeautifulSolution.solvedCount + 1})
        session.commit()
        return Response(status=200)
    else:
        return Response(status=400)


@app.route('/try-questions/<int:task_id>', methods=['POST'])
def increase_solving_attempts(task_id):
    session = sessionmaker(bind=engine)()
    if task_id > session.query(BeautifulSolution).count():
        return Response(status=404)
    session.query(BeautifulSolution).filter_by(id=task_id).update(
        {BeautifulSolution.triedCount: BeautifulSolution.triedCount + 1})
    session.commit()
    return Response(status=200)


@app.route('/like-questions/<int:task_id>', methods=['POST'])
def increase_likes(task_id):
    session = sessionmaker(bind=engine)()
    if task_id > session.query(BeautifulSolution).count():
        return Response(status=404)
    session.query(BeautifulSolution).filter_by(id=task_id).update(
        {BeautifulSolution.likeCount: BeautifulSolution.likeCount + 1})
    session.commit()
    return Response(status=200)


@app.route('/questions-info/<int:task_id>', methods=['GET'])
def get_task_name(task_id):
    session = sessionmaker(bind=engine)()
    if task_id > session.query(BeautifulSolution).count():
        return Response(status=404)
    obj = session.query(BeautifulSolution).filter_by(id=task_id).first()
    print(obj)
    result = {'addition1': obj.add1, 'addition2': obj.add2, 'sum': obj.sum}
    return jsonify(result)


# todo for Ihor: you should manage links in paths


app.run()
