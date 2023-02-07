import React, { useState } from "react";
import { SimpleInfoInterface } from "../../../assets/interfaces/components";
import SiriusLabel from "../../EpicsReact/SiriusLabel";
import * as S from './styled';
import { PvsRadInterface } from "../../../assets/interfaces/access-data";
import { dosage_info, error_table, probe_type } from "../../../assets/constants";
import { capitalize, simplifyLabel } from "../../../controllers/chart";
import SiriusInvisible from "../../EpicsReact/SiriusInvisible";

const InfoBase: React.FC<SimpleInfoInterface> = (props) => {
  const [brand, setBrand] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [sector, setSector] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleStatus(value: string, pv_name?: string): string {
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

  function handleLocation(value: string, pvname?: string): string {
    const spl_arr_par: string[] = value.split("(");
    if(spl_arr_par.length > 1){
      const spl_arr_coma: string[] = spl_arr_par[1].split(",");
      const brand_num: string[] = spl_arr_par[0].split(" ");
      setBrand(brand_num[0]);

      const array_location: string[] = spl_arr_coma[0].split("-");
      let sector_det: string = array_location[1]
      if(array_location.length == 1){
        sector_det = "01"
      }
      setSector(sector_det);

      let clean_loc: string = spl_arr_coma[1].replace("eixo", "").replace(")", "");
      if(array_location.length > 2){
        clean_loc = "hack " + clean_loc
      }
      if(array_location.length == 1){
        clean_loc = "COR_SRV" + clean_loc
      }
      if(clean_loc.includes("chicane")){
        clean_loc = 'chicane 18'
      }
      setLocation(clean_loc.toUpperCase());

      let brand_str: string = ""
      if(brand.length>0){
        brand_str = brand[0]
      }

      let probe: string = ''
      if(pvname != undefined){
        probe = props.pvs_data[simplifyLabel(pvname) as keyof PvsRadInterface]["probe"].toUpperCase()
      }

      return "SI-"+sector+"-"+location.split(' ').join('')+"-"+probe+brand_str
    }
    return ""
  }

  function showInfoTitle(type: string): React.ReactElement|React.ReactElement[]{
    if(type.indexOf("status")==-1 ||
        (props.name.indexOf("ELSE")==-1 &&
        props.name.indexOf("Berthold")==-1)){
      return <S.InfoCell>{capitalize(type)}:</S.InfoCell>
    }
    return <S.InfoCell/>
  }

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
    }else if(
        props.name.indexOf("ELSE")==-1 &&
        props.name.indexOf("Berthold")==-1){
      return (
        <S.InfoValue>
          <SiriusInvisible
            pv_name={[props.pvs_data[
              props.name as keyof PvsRadInterface][
                "neutrons_"+type+"_system"]]}
            updateInterval={500}
            modifyValue={handleStatus}/>
          <SiriusLabel
            state={""}
            pv_name={
              props.pvs_data[
                props.name as keyof PvsRadInterface][
                  "gamma_"+type+"_system"]}
            updateInterval={500}
            modifyValue={handleStatus}/>
        </S.InfoValue>
      );
    }
    return <S.InfoCell colSpan={2}/>
  }

  function showDosage(): React.ReactElement[] {
    return [
        ["integrated_dose", "probe"],
        ["neutrons", "brand"],
        ["gamma", "status"]].map((dosage) =>{
      return (
        <S.InfoRow>
          <S.InfoCell>{dosage_info[dosage[0]].label}:</S.InfoCell>
          <S.InfoValueHigh colSpan={3}>
            <SiriusLabel
              state={""}
              pv_name={props.pvs_data[props.name as keyof PvsRadInterface][dosage[0]]}
              updateInterval={100} egu={dosage_info[dosage[0]].unit}/>
          </S.InfoValueHigh>
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
            state={""}
            pv_name={props.pvs_data[
              props.name as keyof PvsRadInterface].location}
            updateInterval={1000}
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
export default InfoBase;
