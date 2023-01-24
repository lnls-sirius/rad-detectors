import { PvsRadInterface } from "../assets/interfaces/access-data";
import pvs_rad from "../assets/backend_info/pvs_rad.json";
import { DictStr } from "../assets/interfaces/patterns";
import { colors } from "../assets/themes";

function getAxisColors(pv_type: string, pv_name: string): string {
    const pvs: PvsRadInterface = pvs_rad;
    let axis_colors: DictStr = colors.axis;
    if(!(pv_type in axis_colors)){
        return pvs[pv_name as keyof PvsRadInterface]["color"];
    }
    return axis_colors[pv_type as keyof DictStr]
}

function simplifyLabel(pv_name: string, value?: number): string {
    if(value == undefined){
        value = 1;
    }
    const name_split: string[] = pv_name.split(":")
    return name_split[value]
}

function capitalize(str: string): string {
    return str[0].toUpperCase()+str.slice(1)
}

export {
    getAxisColors,
    simplifyLabel,
    capitalize
}
