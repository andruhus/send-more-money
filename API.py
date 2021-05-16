import flask

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/')
class Home:
    pass




app.run()