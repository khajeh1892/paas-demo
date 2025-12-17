from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "PaaS app is running successfully 🚀"

if __name__ == "__main__":
    app.run()
