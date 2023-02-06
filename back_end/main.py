import json
from flask import Flask

app = Flask(__name__)

# Returns the page with the information about the URL Request
@app.route("/")
def home():
    file = open('./assets/pvs_rad.json', "r")
    data = json.loads(file.read())
    file.close()
    return data


if __name__ == "__main__":
    app.SIGNATURES = {}
    app.run(host="10.0.105.5", port=8080, debug=True)
