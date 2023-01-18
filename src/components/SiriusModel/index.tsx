import React, { useState } from "react";
import locations from "../../assets/backend_info/det_locations.json";
import { Coordinates, DictString, ModelLocations, PvsRadInterface } from "../../assets/interfaces";
import SiriusLed from "../EpicsReact/SiriusLed";
import SimpleInfo from "../SimpleInfo";
import pvs_rad from "../../assets/backend_info/pvs_rad.json";
import * as S from './styled';
import DetailedInfo from "../DetailedInfo";
import SiriusInvisible from "../EpicsReact/SiriusInvisible";

const SiriusModel: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [detector, setDetector] = useState<string>("Thermo1");
  const pvs: PvsRadInterface = pvs_rad;
  const model_locations: ModelLocations = locations;
  const [det_loc, setDetLoc] = useState<DictString[]>([{}]);

  function handleModal(name: string): void {
    setModal(true);
    setDetector(name);
  }

  function detectorList(): string[] {
    let pv_list: string[] = [];
    Object.values(pvs).map((data: DictString)=> {
      pv_list.push(data.location);
    })
    return pv_list
  }

  function handleDetPos(key: string, value: string): void {
    if(value!=null){
      const array_spt: string[] = value.split(",");
      const array_spt2: string[] = array_spt[1].split(" ");
      let axis: string = array_spt2[array_spt2.length-1].replace(")", "")
      let stateLoc: DictString[] = [...det_loc];
      let loc: string = 'ro';
      if(value.includes("hall")){
        loc = 'ha';
      }else if(value.includes("IA") || value.includes("corredor")){
        loc = 'cs';
      }
      if(axis=='1'){
        axis = '18'
        loc = 'cs'
      }
      stateLoc[0][key] = loc+axis;
      setDetLoc(stateLoc);
    }
  }

  function leds(): React.ReactElement[] {
    return Object.entries(det_loc[0]).map(([name, loc]: any) => {
      let coord: Coordinates = {
        x: model_locations[loc].x,
        y: model_locations[loc].y
      }
      return (
        <S.LedWrapper
            x={coord.x} y={coord.y}
            onClick={()=>handleModal(name)}>
          <SimpleInfo
              x={coord.x} y={coord.y}
              name={name}
              modal={modal}>
            <SiriusLed
              key={name}
              alert={1.5}
              alarm={2}
              shape={loc.slice(0, 2)}
              pv_name={pvs[name as keyof PvsRadInterface]["integrated_dose"]}
              updateInterval={100}/>
          </SimpleInfo>
        </S.LedWrapper>
      )
    });
  }

  return (
    <S.Model>
      <SiriusInvisible
        pv_name={detectorList()}
        modifyValue={handleDetPos}/>
      <DetailedInfo
        name={detector}
        modal={modal}
        close={setModal}/>
      {leds()}
    </S.Model>
  );
};
export default SiriusModel;
