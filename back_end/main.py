import json
from app import app
from flask import request

"""
    Load the default detectors configuration JSON file.

    :return: data
    :rtype: dict(str: dict(config_det: str))

    config_det: "neutrons", "dose_rate", "gamma_status_system",
        "location", "neutron_status_probe", "neutrons_status_system",
        "integrated_dose", "probe", "gamma",
        "gamma_status_probe", "color"
"""
@app.route("/load")
def load():
    data = {}
    with open('./assets/pvs_rad.json', 'r') as file:
        data = json.loads(file.read())

    return data


"""
    Save POST data to the default detectors configuration JSON file.
    :post: data
    :ptype: dict(str: dict(config_det: str))
    :return: ''
    :rtype: str

    config_det: "neutrons", "dose_rate", "gamma_status_system",
        "location", "neutron_status_probe", "neutrons_status_system",
        "integrated_dose", "probe", "gamma",
        "gamma_status_probe", "color"
"""
@app.route("/save", methods=["POST"])
def save():
    req_type = request.json["data"]["type"]
    req_data = request.json["data"]["data"]
    if req_type == "detectors":
        with open('./assets/pvs_rad.json', 'w') as file:
            data = json.dumps(req_data)
            file.write(data)
    elif req_type == "log":
        with open('./assets/access.log', 'a+') as file:
            file.write(req_data+"\n")

    return ''

if __name__ == "__main__":
    app.SIGNATURES = {}
    app.run()
