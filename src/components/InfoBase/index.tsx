import React, { useState } from "react";
import { SimpleInfoInterface, PvsRadInterface, DictString } from "../../assets/interfaces";
import SiriusLabel from "../EpicsReact/SiriusLabel";
import pvs_rad from "../../assets/backend_info/pvs_rad.json";
import * as S from './styled';

const InfoBase: React.FC<SimpleInfoInterface> = (props) => {
  const [brand, setBrand] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [sector, setSector] = useState<string>("");
  const pvs: PvsRadInterface = pvs_rad;

  function showInfoTitle(type: string): React.ReactElement|React.ReactElement[]{
    const dictInfo: DictString = {
      "sonda": "Sonda",
      "status": "Status"
    }
    if(type.indexOf("status")==-1 ||
        (props.name.indexOf("ELSE")==-1 &&
        props.name.indexOf("Berthold")==-1)){
      return <S.InfoCell>{dictInfo[type]}:</S.InfoCell>
    }
    return <S.InfoCell/>
  }

  function handleStatus(value: string): string {
    if(value == "0"){
      return "Ok"
    }
    return "Error"
  }

  function handleLocation(value: string): string {
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
      return "SI-"+sector+"-"+location.split(' ').join('')+"-"+brand_str
    }
    return ""
  }

  function showInformation(type: string, status_ref: string): React.ReactElement|React.ReactElement[]{
    if(type == "sonda"){
      return (
        <S.InfoValue colSpan={2}>
          γ + n
        </S.InfoValue>
      );
    }else if(
        props.name.indexOf("ELSE")==-1 &&
        props.name.indexOf("Berthold")==-1){
      return ["probe", "system"].map((sts_type: string)=>{
        let key: string = status_ref+"_"+type+"_"+sts_type;
        return (
          <S.InfoValue>
            {sts_type}
            <SiriusLabel
              state={""}
              pv_name={pvs[props.name as keyof PvsRadInterface][key]}
              updateInterval={500}
              modifyValue={handleStatus}/>
          </S.InfoValue>
        );
      }
      );
    }
    return <S.InfoCell colSpan={4}/>
  }

  function showDosage(): React.ReactElement[] {
    return [
        ["integrated_dose", "Integrated Dose:", "μSv", "sonda"],
        ["neutrons", "Neutrons Dose:", "μSv/h", "status"],
        ["gamma", "Gamma Dose:", "μSv/h", "status"]].map((dosage) =>{
      return (
        <S.InfoRow>
          <S.InfoCell>{dosage[1]}</S.InfoCell>
          <S.InfoValue colSpan={4}>
            <SiriusLabel
              state={""}
              pv_name={pvs[props.name as keyof PvsRadInterface][dosage[0]]}
              updateInterval={500} egu={dosage[2]}/>
          </S.InfoValue>
          {(props.modal)?
            [showInfoTitle(dosage[3]),
            showInformation(dosage[3], dosage[0])]:<div/>}
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
            pv_name={pvs[props.name as keyof PvsRadInterface].location}
            updateInterval={1000}
            modifyValue={handleLocation} />
        </S.InfoValue>
        {(props.modal)?[
          <S.InfoCell>Location: </S.InfoCell>,
          <S.InfoValue>{location}</S.InfoValue>,
          <S.InfoCell>Sector: </S.InfoCell>,
          <S.InfoValue>{sector}</S.InfoValue>,
          <S.InfoCell>Brand: </S.InfoCell>,
          <S.InfoValue>{brand}</S.InfoValue>]:<div/>}
      </S.InfoRow>
      {showDosage()}
    </S.InfoContainer>
  );
};
export default InfoBase;
