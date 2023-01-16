import React, { useEffect, useState } from "react";
import locations from "../../assets/backend_info/det_locations.json";
import { DictString } from "../../assets/interfaces";
import SiriusCaget from "../EpicsReact/SiriusCaget";
import SiriusLed from "../EpicsReact/SiriusLed";
import Infomation from "../Information";
import * as S from './styled';

const SiriusModel: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    const locationList = new SiriusCaget({pv_list: ["RAD:Thermo1:Location-Cte", "RAD:Thermo2:Location-Cte"]})
  }, [])

  function leds(): React.ReactElement[] {
    return Object.entries(locations).map(([name, data]: any) => {
      if(name == "bo2" || name == "bo3"){
        return (
          <S.LedWrapper
              x={data.x} y={data.y}
              onClick={()=>setModal(true)}>
            <Infomation
                details={modal}
                close={()=>setModal(false)}>
              <SiriusLed
                key={name}
                alert={1.5}
                alarm={2}
                shape={name.slice(0, 2)}
                pv_name={"RAD:Thermo1:Gamma"}
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
      {leds()}
    </S.Model>
  );
};
export default SiriusModel;
