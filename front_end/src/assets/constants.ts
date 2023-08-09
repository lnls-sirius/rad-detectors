// import GitInfo from 'react-git-info/macro';
import { DDictStr, DictEnumStr, DictNum, DictStr } from "./interfaces/patterns"

// const git_version = GitInfo()
const version: string = "v1.2.1"//+git_version.commit.shortHash + " / " + git_version.commit.date;

// Integrated dose limits parameters
const led_limits: DictNum = {
    "alert": 1,
    "alarm": 2
}

// Dose rate limits parameters
const dose_rate_limits: DictNum = {
    "reference": 0.5
}

// Legend of Model Page Leds Status
const status_legend: string[] = [
    "OK (<"+led_limits["alert"]+"μSv)",
    "Alert ("+led_limits["alert"]+"-"+led_limits["alarm"]+"μSv)",
    "Alarm (≥"+led_limits["alarm"]+"μSv)",
    "Disconnected"
]

// Styled string of probe type
const probe_type: DictStr = {
    'gn': "\u03B3 + n",
    'g': "\u03B3",
    'n': "n"
}

// Name of the probe type
const probe_name: DictStr = {
    'g': "Gamma",
    'n': "Neutrons"
}

// Dosage base information
const dosage_info: DDictStr = {
    "integrated_dose": {
        "label": "Integrated Dose",
        "unit": "μSv"
    },
    "neutrons": {
        "label": "Neutrons Dose",
        "unit": "μSv/h"
    },
    "gamma": {
        "label": "Gamma Dose",
        "unit": "μSv/h"
    },
    "": {
        "label": "",
        "unit": ""
    }
}

// Led shape based on the probe
const probe_shape: DictStr = {
    "gn": "squ_circ",
    "g": "circle",
    "n": "square"
}

// Errors information
const error_table: DictEnumStr = {
    "system": [
        "RESET Ocurred",
        "PROM Error",
        "RAM Error",
        "Configuration Error",
        "History was cleared",
        "Low Battery",
        "Alarm 2",
        "Alarm 1",
        "Error Ocurred",
        "Error Ocurred"
    ]
}

export {
    version,
    led_limits,
    status_legend,
    dosage_info,
    dose_rate_limits,
    probe_type,
    probe_name,
    probe_shape,
    error_table
}
