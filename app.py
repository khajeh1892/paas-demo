from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "PaaS app is running successfully 🚀"

@app.route("/health")
def health():
    return {"status": "ok"}
