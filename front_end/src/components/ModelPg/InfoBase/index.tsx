import React, { useState } from "react";
import { SiriusLabel, SiriusInvisible } from "sirius-epics-react";
import { BaseInfoInterface } from "../../../assets/interfaces/components";
import { PvsRadInterface } from "../../../assets/interfaces/access-data";
import sirius_names from "../../../assets/files/sirius_names.json";
import { dosage_info, error_table, probe_type } from "../../../assets/constants";
import { capitalize, location_text, simplifyLabel } from "../../../controllers/chart";
import { DictStr } from "../../../assets/interfaces/patterns";
import * as S from './styled';

/**
 * Show the Information about the Detector
 * [name, sector, location, brand, error,
 * integrated dose, gamma dose, neutrons dose]
 *
 * Can be used in a simplified or detailed display.
 *
 * @param brand - brand of the detector.
 * @param location - location of the detector.
 * @param sector - sector of the detector.
 * @param error - error list of the detector.
 */

const defaultProps: BaseInfoInterface = {
  pvs_data: {},
  name: "",
  modal: false
}

const InfoBase: React.FC<BaseInfoInterface> = (props) => {
  const [brand, setBrand] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [sector, setSector] = useState<string>("");
  const [error, setError] = useState<string>("");

  /**
   * Error list of the invisible probe
   * @param value - PvData measured by the PV.
   * @param pv_name - PV name of the measured PV.
   * @returns error list
   */
  function handleInv(value: any, pv_name: string): any {
    if(value.value && pv_name){
      return handleStatus(value.value, pv_name)
    }
    return ""
  }

  /**
   * Error list of the probe
   * @param value - PV value measured by the PV.
   * @param pv_name - PV name of the measured PV.
   * @returns error list
   */
  function handleStatus(value: any, pv_name?: string): any {
    if(value == "0"){
      return "Ok"
    }
    if(pv_name != undefined){
      pv_name = " "+simplifyLabel(pv_name, 2)+": "
    }else{
      pv_name = " Unknown"
    }
    let bin_value: string = Number(value).toString(2)
    let error_idx: string[] = [];
    for(let i=0; i<bin_value.length;i++) {
      if (bin_value[i] === "1"){
        let idx: number = bin_value.length-i-1;
        if(idx <= 5 || idx >= 12){
          if(idx >= 12){
            idx -= 6;
          }
          error_idx.push(
            pv_name + error_table['system'][idx]);
        }
      }
    }
    if(pv_name.includes("Neutron")){
      setError(error_idx.toString())
    }
    return error+error_idx.toString()
  }

  /**
   * Function that transforms the Location PV into the brand, sector, location and name.
   * @param value - PV value measured by the PV.
   * @param pv_name - PV name of the measured PV.
   * @returns Detector name
   */
  function handleLocation(value: any, pvname?: string): any {
    if(pvname){
      const det_id: string = simplifyLabel(pvname);
      const det_data = props.pvs_data[det_id];
      const model_locations: {[key: string]: DictStr} = sirius_names;
      const spl_arr_par: string[] = value.split("(");
      if(spl_arr_par.length > 1){
        const spl_arr_coma: string[] = spl_arr_par[1].split(",");
        const brand_num: string[] = spl_arr_par[0].split(" ");
        setBrand(brand_num[0]);

        let slice_array = [-2, ];
        if(spl_arr_coma[1].slice(-1) == ')'){
          slice_array = [-3, -1];
        }
        let clean_loc: string = spl_arr_coma[1].slice(
          slice_array[0], slice_array[1]);
        if(spl_arr_coma[1].includes("chicane 1")){
          clean_loc = "18";
        }

        const axis: string = clean_loc;
        const sector_names: DictStr = model_locations[axis];
        const location_code: string = det_data["default_location"];
        let location: string = "";

        if(location_code.includes('cs')){
          location += sector_names["cor_srv"];
        }
        if(location_code.includes('ha')){
          location += "HALL" + axis;
        }
        if(location_code.includes('bo')){
          location += "BOOSTER" + axis;
        }
        if(location_code.includes('ro')){
          location += "ROOF" + axis;
        }

        setLocation(location);

        const sector_lbl: string = sector_names["sector"].slice(3,5);
        setSector(sector_lbl);

        return location_text(det_data, det_id, false)
      }
    }
    return ""
  }

  /**
   * Display the title of an information.
   * @param type - Type of the information being displayed.
   */
  function showInfoTitle(type: string): React.ReactElement|React.ReactElement[]{
    const pvinfo: DictStr = props.pvs_data[
    props.name as keyof PvsRadInterface];
    if(type.indexOf("status")==-1 ||
        "neutrons_"+type+"_system" in pvinfo ||
        "gamma_"+type+"_system" in pvinfo){
      return <S.InfoCell>{capitalize(type)}:</S.InfoCell>
    }
    return <S.InfoCell/>
  }

  /**
   * Display the information about the probe, brand and status.
   * @param type -
   * @returns
   */
  function showInformation(type: string): React.ReactElement|React.ReactElement[]{
    if(type == "probe"){
      return (
        <S.InfoValue>
          {probe_type[
            props.pvs_data[props.name as keyof PvsRadInterface][type]]}
        </S.InfoValue>
      );
    }else if(type == "brand"){
      return (
        <S.InfoValue>{brand}</S.InfoValue>
      )
    }else{
        const pvinfo: DictStr = props.pvs_data[props.name];
        if(pvinfo){
          if("neutrons_status_system" in pvinfo &&
            "gamma_status_system" in pvinfo){
              return (
                <S.InfoValue>
                  <SiriusInvisible
                    pv_name={[pvinfo[
                        "neutrons_status_system"]]}
                    update_interval={500}
                    modifyValue={handleInv}/>
                  <SiriusLabel
                    pv_name={
                      pvinfo[
                        "gamma_status_system"]}
                    update_interval={500}
                    precision={3}
                    modifyValue={handleStatus}/>
                </S.InfoValue>
              );
          }else if("neutrons_status_system" in pvinfo){
            return (
              <S.InfoValue>
                <SiriusLabel
                  pv_name={
                    pvinfo[
                      "neutrons_status_system"]}
                  update_interval={500}
                  precision={3}
                  modifyValue={handleStatus}/>
              </S.InfoValue>
            );
          }else if("gamma_status_system" in pvinfo){
            return (
              <S.InfoValue>
                <SiriusLabel
                  pv_name={
                    pvinfo[
                      "gamma_status_system"]}
                  update_interval={500}
                  precision={3}
                  modifyValue={handleStatus}/>
              </S.InfoValue>
            );
          }
        }
    }
    return <S.InfoCell colSpan={2}/>
  }

  /**
   * Show Table with dosage information and, if in its detailed view,
   * the probe, brand and status.
   */
  function showDosage(): React.ReactElement[] {
    return [
      ["integrated_dose", "probe"],
      ["neutrons", "brand"],
      ["gamma", "status"]].map((dosage) =>{
        const pvinfo: DictStr = props.pvs_data[props.name as keyof PvsRadInterface];
        return (
          <S.InfoRow>
            {(dosage[0] in pvinfo)?
              <S.InfoCell>{dosage_info[dosage[0]].label}:</S.InfoCell>:
              <S.InfoCell/>}
            {(dosage[0] in pvinfo)?
              <S.InfoValueHigh colSpan={3}>
                <SiriusLabel
                  pv_name={pvinfo[dosage[0]]}
                  update_interval={100}
                  precision={3}
                  egu={dosage_info[dosage[0]].unit}/>
              </S.InfoValueHigh>:
              <S.InfoCell colSpan={3}/>}
            {(props.modal)?
              [showInfoTitle(dosage[1]),
              showInformation(dosage[1])]:<div/>}
          </S.InfoRow>
        )
    });
  }

  return (
    <S.InfoContainer>
      <S.InfoRow>
        <S.InfoCell>Name: </S.InfoCell>
        <S.InfoValue>
          <SiriusLabel
            pv_name={props.pvs_data[
              props.name as keyof PvsRadInterface].location}
            update_interval={1000}
            modifyValue={handleLocation} />
        </S.InfoValue>
        {(props.modal)?[
          <S.InfoCell>Sector: </S.InfoCell>,
          <S.InfoValue>{sector}</S.InfoValue>,
          <S.InfoCell>Location: </S.InfoCell>,
          <S.InfoValue>{location}</S.InfoValue>]:<div/>}
      </S.InfoRow>
      {showDosage()}
    </S.InfoContainer>
  );
};

InfoBase.defaultProps = defaultProps;
export default InfoBase;
