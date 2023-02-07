import json
from flask_cors import CORS
from flask import Flask, request

app = Flask(__name__)
CORS(app)

@app.route("/load")
def load():
    file = open('./assets/pvs_rad.json', "r")
    data = json.loads(file.read())
    file.close()
    return data

@app.route("/save", methods=["POST"])
def save():
    print(request.form)

if __name__ == "__main__":
    app.SIGNATURES = {}
    app.run(host="127.0.0.1", port=8080, debug=True)
