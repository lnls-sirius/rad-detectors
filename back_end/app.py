import json
from flask_cors import CORS
from flask import Flask, request

app = Flask(__name__)
CORS(app)

@app.route("/load")
def load():
    with open('./assets/pvs_rad.json', 'r') as file:
        data = json.loads(file.read())
    return data

@app.route("/save", methods=["POST"])
def save():
    with open('./assets/pvs_rad.json', 'w') as file:
        data = json.dumps(request.json['data'])
        file.write(data)
    return ''

if __name__ == "__main__":
    app.SIGNATURES = {}
    app.run()
