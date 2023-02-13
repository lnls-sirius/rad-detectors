import React, { useState } from "react";
import locations from "../../../assets/backend_info/det_locations.json";
import { AlertInterface, ModelLocations } from "../../../assets/interfaces/components";
import SiriusLed from "../../EpicsReact/SiriusLed";
import SimpleInfo from "../SimpleInfo";
import * as S from './styled';
import DetailedInfo from "../DetailedInfo";
import SiriusInvisible from "../../EpicsReact/SiriusInvisible";
import { Coordinates, DictStr } from "../../../assets/interfaces/patterns";
import { PvsRadInterface } from "../../../assets/interfaces/access-data";
import { led_limits, probe_shape } from "../../../assets/constants";

const SiriusModel: React.FC<AlertInterface> = (props) => {
  const model_locations: ModelLocations = locations;
  const [modal, setModal] = useState<boolean>(false);
  const [detector, setDetector] = useState<string>("Thermo1");
  const [det_loc, setDetLoc] = useState<DictStr[]>([{}]);

  function handleModal(name: string): void {
    setModal(true);
    setDetector(name);
  }

  function detectorList(): string[] {
    let pv_list: string[] = [];
    Object.values(props.pvs_data).map((data: DictStr, idx_data: number)=> {
      pv_list[idx_data] = data.location;
    })
    return pv_list
  }

  function handleDetPos(value: any, pv_name?: string): void {
    let position: string = value.value;
    if(position!=null){
      const array_spt: string[] = position.split(",");
      const array_spt2: string[] = array_spt[1].split(" ");
      let axis: string = array_spt2[array_spt2.length-1].replace(")", "")
      let stateLoc: DictStr[] = [...det_loc];
      let loc: string = 'ro';
      if(position.includes("hall")){
        loc = 'ha';
      }else if(position.includes("IA") || position.includes("corredor")){
        loc = 'cs';
      }
      if(axis=='1'){
        axis = '18'
        loc = 'cs'
      }
      if(pv_name){
        pv_name = pv_name.replace("RAD:","").replace(":Location-Cte","")
        stateLoc[0][pv_name] = loc+axis;
        setDetLoc(stateLoc);
      }
    }
  }

  function handleLedState(value: number, pvname?: string): number {
    if(pvname){
      if(value == 0){
        props.popup.remove_alert(pvname);
      }else if(value == 1){
        props.popup.add_alert(pvname);
      }else if(value == 2){
        props.popup.add_alarm(pvname);
      }
    }
    return value
  }

  function leds(): React.ReactElement[] {
    return Object.entries(det_loc[0]).map(([name, loc]: [string, string]) => {
      let coord: Coordinates = {
        x: model_locations[loc].x,
        y: model_locations[loc].y
      }
      const pvinfo: DictStr = props.pvs_data[name as keyof PvsRadInterface];
      if(pvinfo){
        return (
          <S.LedWrapper
            x={coord.x} y={coord.y}
            onClick={()=>handleModal(name)}>
              <SimpleInfo
                x={coord.x} y={coord.y}
                name={name}
                modal={modal}
                pvs_data={props.pvs_data}>
                  <SiriusLed
                    key={name}
                    alert={led_limits.alert}
                    alarm={led_limits.alarm}
                    shape={probe_shape[pvinfo["probe"]]}
                    pv_name={pvinfo["integrated_dose"]}
                    updateInterval={100}
                    modifyValue={handleLedState}/>
              </SimpleInfo>
          </S.LedWrapper>
        )
      }
      return <div />;
    });
  }

  return (
    <S.Model>
      <DetailedInfo
        name={detector}
        modal={modal}
        close={setModal}
        pvs_data={props.pvs_data}/>
      <SiriusInvisible
        pv_name={detectorList()}
        modifyValue={handleDetPos}/>
      {leds()}
    </S.Model>
  );
};
export default SiriusModel;
