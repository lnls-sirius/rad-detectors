import React, { useEffect, useState } from "react";
import locations from "../../assets/backend_info/det_locations.json";
import { PvsRadInterface } from "../../assets/interfaces";
import SiriusCaget from "../EpicsReact/SiriusCaget";
import SiriusLed from "../EpicsReact/SiriusLed";
import Infomation from "../SimpleInfo";
import pvs_rad from "../../assets/backend_info/pvs_rad.json";
import * as S from './styled';
import DetailedInfo from "../DetailedInfo";

const SiriusModel: React.FC = () => {
  const [modal, setModal] = useState<boolean>(true);
  const [detector, setDetector] = useState<string>("Berthold1");
  const pvs: PvsRadInterface = pvs_rad;

  useEffect(() => {
    const locationList = new SiriusCaget({pv_list:
      ["RAD:Thermo1:Location-Cte", "RAD:Thermo2:Location-Cte"]})
  }, [])

  function handleModal(name: string): void {
    setModal(true);
    setDetector(name);
  }

  function leds(): React.ReactElement[] {
    return Object.entries(locations).map(([name, data]: any) => {
      if(name == "bo2" || name == "bo3"){
        return (
          <S.LedWrapper
              x={data.x} y={data.y}
              onClick={()=>handleModal("Thermo1")}>
            <Infomation
                name={detector}
                modal={modal}>
              <SiriusLed
                key={name}
                alert={1.5}
                alarm={2}
                shape={name.slice(0, 2)}
                pv_name={pvs[detector as keyof PvsRadInterface]["integrated_dose"]}
                updateInterval={100}/>
            </Infomation>
          </S.LedWrapper>
        )
      }
      return (<div></div>);
    });

  }

  return (
    <S.Model>
      <DetailedInfo
        name={detector}
        modal={modal}
        close={setModal}/>
      {leds()}
    </S.Model>
  );
};
export default SiriusModel;
