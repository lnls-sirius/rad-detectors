import React from "react";
import { DetailedInfo, PvsRadInterface } from "../../assets/interfaces";
import SiriusLabel from "../EpicsReact/SiriusLabel";
import pvs_rad from "../../assets/backend_info/pvs_rad.json";
import * as S from './styled';

const Infomation: React.FC<DetailedInfo> = (props) => {
  const pvs: PvsRadInterface = pvs_rad;
  let name: string = "Berthold1";

  function showDetailedInfo(): React.ReactElement {
    if(props.details){
      return (
        <S.InfoCell>
          B
        </S.InfoCell>
      )
    }
    return <div></div>
  }

  function showDosage(): React.ReactElement[] {
    return [
        ["integrated_dose", "Integrated:", "μSv"],
        ["neutrons", "Neutrons:", "μSv/h"],
        ["gamma", "Gamma:", "μSv/h"]].map((dosage) =>{
      return (
        <S.InfoRow>
          <S.InfoCell>{dosage[1]}</S.InfoCell>
          <S.InfoCell>
            <SiriusLabel
              state={""}
              pv_name={pvs[name as keyof PvsRadInterface][dosage[0]]}
              updateInterval={100} egu={dosage[2]}/>
          </S.InfoCell>
          {showDetailedInfo()}
        </S.InfoRow>
      )
    });
  }

  return (
    <S.TooltipWrapper>
      {props.children}
      <S.InfoContainer>
        <S.InfoRow>
          <S.InfoCell>Name: </S.InfoCell>
          <S.InfoCell colSpan={2}>
            <SiriusLabel
              state={""}
              pv_name={pvs[name as keyof PvsRadInterface].location}
              updateInterval={100} />
          </S.InfoCell>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoCell colSpan={3}>Dosages</S.InfoCell>
        </S.InfoRow>
        {showDosage()}
      </S.InfoContainer>
    </S.TooltipWrapper>
  );
};
export default Infomation;
