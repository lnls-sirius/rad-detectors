import React from "react";
import { SimpleInfoInterface, PvsRadInterface, DictString } from "../../assets/interfaces";
import SiriusLabel from "../EpicsReact/SiriusLabel";
import pvs_rad from "../../assets/backend_info/pvs_rad.json";
import * as S from './styled';

const InfoBase: React.FC<SimpleInfoInterface> = (props) => {
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

  function showInformation(type: string, status_ref: string): React.ReactElement|React.ReactElement[]{
    if(type == "sonda"){
      return (
        <S.InfoCell colSpan={2}>
          γ + n
        </S.InfoCell>
      );
    }else if(
        props.name.indexOf("ELSE")==-1 &&
        props.name.indexOf("Berthold")==-1){
      return ["probe", "system"].map((sts_type: string)=>{
        let key: string = status_ref+"_"+type+"_"+sts_type;
        return (
          <S.InfoCell>
            {sts_type}
            <SiriusLabel
              state={""}
              pv_name={pvs[props.name as keyof PvsRadInterface][key]}
              updateInterval={500}/>
          </S.InfoCell>
        );
      }
      );
    }
    return <S.InfoCell/>
  }

  function showDosage(): React.ReactElement[] {
    return [
        ["integrated_dose", "Integrated Dose:", "μSv", "sonda"],
        ["neutrons", "Neutrons Dose:", "μSv/h", "status"],
        ["gamma", "Gamma Dose:", "μSv/h", "status"]].map((dosage) =>{
      return (
        <S.InfoRow>
          <S.InfoCell>{dosage[1]}</S.InfoCell>
          <S.InfoCell>
            <SiriusLabel
              state={""}
              pv_name={pvs[props.name as keyof PvsRadInterface][dosage[0]]}
              updateInterval={500} egu={dosage[2]}/>
          </S.InfoCell>
          {(props.modal)?
            showInfoTitle(dosage[3]):<div/>}
          {(props.modal)?
            showInformation(dosage[3], dosage[0]):<div/>}
        </S.InfoRow>
      )
    });
  }

  return (
    <S.InfoContainer>
      <S.InfoRow>
        <S.InfoCell>Name: </S.InfoCell>
        <S.InfoCell>
          <SiriusLabel
            state={""}
            pv_name={pvs[props.name as keyof PvsRadInterface].location}
            updateInterval={1000} />
        </S.InfoCell>
        {(props.modal)?[<S.InfoCell>Location: </S.InfoCell>,
          <S.InfoCell colSpan={2}>
            <SiriusLabel
              state={""}
              pv_name={pvs[props.name as keyof PvsRadInterface].location}
              updateInterval={1000} />
          </S.InfoCell>]:<div/>
        }
      </S.InfoRow>
      {showDosage()}
    </S.InfoContainer>
  );
};
export default InfoBase;
