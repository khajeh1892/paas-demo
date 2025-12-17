from flask import Flask, render_template
import datetime

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", build=datetime.datetime.utcnow().isoformat())
