import { DictStr } from "../assets/interfaces/patterns";
import { colors } from "../assets/themes";

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

export {
    getAxisColors,
    simplifyLabel,
    capitalize
}
