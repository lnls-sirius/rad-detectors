import { DictStr } from "../assets/interfaces/patterns";
import { colors } from "../assets/themes";
import sirius_names from "../assets/files/sirius_names.json";

/**
 * Get Axis color based on PV type
 *
 * @param pv_type - type of the PV <'integrated_dose', 'dose_rate', 'gamma', 'neutrons'>
 * @param data - Radiation detectors configuration data
 * @returns axis color
 */
function getAxisColors(pv_type: string, data: DictStr): string {
    let axis_colors: DictStr = colors.axis;
    if(!(pv_type in axis_colors)){
        return data["color"];
    }
    return axis_colors[pv_type as keyof DictStr]
}

/**
 * Remove redundant PV information from the PV name
 *
 * @param pv_name - PV name
 * @param value - Position of the relevant information split with ':'
 * @returns simplified PV name
 */
function simplifyLabel(pv_name: string, value?: number): string {
    if(value == undefined){
        value = 1;
    }
    const name_split: string[] = pv_name.split(":")
    return name_split[value]
}

/**
 * Capitalize string
 *
 * @param str - normal string
 * @returns capitalized string
 */
function capitalize(str: string): string {
    return str[0].toUpperCase()+str.slice(1)
}


function location_text(det_data: DictStr, name: string, array=true): string[] {
    let label_array: string[] = []
    const location_code: string = det_data["default_location"]
    const axis: string = location_code.slice(2, 4)

    let det_label: string = ""

    const model_locations: {[key: string]: DictStr} = sirius_names;
    const sector_names: DictStr = model_locations[axis.toString()];
    det_label += sector_names["sector"];

    if(array){
        label_array[0] = det_label
        det_label = ''
    }else{
      det_label += '-'
    }

    if(location_code.includes('cs')){
      det_label += sector_names["cor_srv"];
    }
    if(location_code.includes('ha')){
      det_label += "HALL" + axis;
    }
    if(location_code.includes('bo')){
      det_label += "BOOSTER" + axis;
    }
    if(location_code.includes('ro')){
      det_label += "ROOF" + axis;
    }

    if(array){
        label_array[1] = det_label
        det_label = ''
    }else{
      det_label += '-'
    }

    if(location_code.includes('cs')){
      det_label += axis + "-"
    }

    det_label += det_data["probe"].toUpperCase()
    det_label += name[0].toUpperCase()
    if(array){
        label_array[2] = det_label
    }else{
        label_array = [det_label]
    }
    return label_array
  }


export {
    getAxisColors,
    simplifyLabel,
    capitalize,
    location_text
}
