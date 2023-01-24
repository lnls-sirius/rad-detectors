import { DictNum, DictStr } from "./interfaces/patterns"

const led_limits: DictNum = {
    "alert": 1.5,
    "alarm": 2
}

const dose_rate_limits: DictNum = {
    "reference": 0.5
}

const status_legend: string[] = [
    "OK (<1.5μSv)",
    "Alert (1.5-2μSv)",
    "Alarm (≥2μSv)",
    "Failed"
]

const probe_type: DictStr = {
    'gn': "\u03B3 + n",
    'g': "\u03B3",
    'n': "n"
}

const dosage_info: any = {
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
    }
}

const probe_shape: DictStr = {
    "gn": "circle",
    "g": "rectangle",
    "n": "square"
}

const error_table: any = {
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
    led_limits,
    status_legend,
    dosage_info,
    dose_rate_limits,
    probe_type,
    probe_shape,
    error_table
}
