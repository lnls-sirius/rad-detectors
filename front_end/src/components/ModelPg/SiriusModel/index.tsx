import React, { useState } from "react";
import { SiriusLed } from "sirius-epics-react";
import SimpleInfo from "../SimpleInfo";
import DetailedInfo from "../DetailedInfo";
import Popup_List from "../../../controllers/alert";
import locations from "../../../assets/files/det_locations.json";
import { led_limits, probe_shape } from "../../../assets/constants";
import { AlertInterface, ModelLocations } from "../../../assets/interfaces/components";
import { Coordinates, DictStr } from "../../../assets/interfaces/patterns";
import { PvsRadInterface } from "../../../assets/interfaces/access-data";
import * as S from './styled';

/**
 *
 * The SiriusModel page shows a diagram where its possible to access the detailed
 * information of all the radiation detectors.
 *
 * @param props
 *  - pvs_data: Contains the radiation detectors configuration data
 *  - popup: Stores an object for monitoring and registering alerts and alarms.
 * @param model_locations - Locations available for the detectors.
 * @param modal - State of the modal with the detailed information.
 * @param detector - The selected detector.
 * @param det_loc - Dictionary that associates the detectors with a
 * position in the model.
*/

const defaultProps: AlertInterface = {
  pvs_data: {},
  popup: new Popup_List(),
  setModal: ()=>null,
  setDetector: ()=>null
}

const SiriusModel: React.FC<AlertInterface> = (props) => {
  const model_locations: ModelLocations = locations;
  const [det_loc, setDetLoc] = useState<DictStr[]>([{}]);

  /**
   * Function called on click on a detector's led.
   * @param name - Detector name.
   */
  function handleModal(name: string): void {
    props.setModal(true);
    props.setDetector(name);
  }

  /**
   * Get a list of the location PV of all detectors
   * @returns list of the location PVs
   */
  // function detectorList(): string[] {
  //   let pv_list: string[] = [];
  //   Object.values(props.pvs_data).map((data: DictStr, idx_data: number)=> {
  //     pv_list[idx_data] = data.location;
  //   })
  //   return pv_list
  // }

  /**
   * Generate a dicitonary {str<name>: str<location>} of default locations
   * of all the detectors.
   * @returns default detector's location dictionary
   */
  function getDefaultLocations(): DictStr {
    let stateLoc: DictStr = {};
    Object.entries(props.pvs_data).map(([pv_name, data]: [string, DictStr])=> {
      pv_name = pv_name.replace("RAD:","").replace(":Location-Cte","")
      stateLoc[pv_name] = data.default_location;
    })
    return stateLoc;
  }

  /**
   * Receive the value mesured by a location PV with EPICS and
   * associate this location with the detector on the model.
   * @param value - pvData measured by EPICS
   * @param pv_name - name of the PV being received
   */
  // function handleDetPos(value: any, pv_name?: string): void {
  //   let position: string = value.value;
  //   let stateLoc: DictStr[] = [...det_loc];
  //   if(position!=null){
  //     const array_spt: string[] = position.split(",");
  //     const array_spt2: string[] = array_spt[1].split(" ");
  //     let axis: string = array_spt2[array_spt2.length-1].replace(")", "");
  //     let loc: string = 'ro';
  //     if(position.includes("hall")){
  //       loc = 'ha';
  //     }else if(position.includes("IA") || position.includes("corredor")){
  //       loc = 'cs';
  //     }
  //     if(axis=='1'){
  //       axis = '18'
  //       loc = 'cs'
  //     }
  //     if(pv_name){
  //       pv_name = pv_name.replace("RAD:","").replace(":Location-Cte","")
  //       stateLoc[0][pv_name] = loc+axis;
  //       setDetLoc(stateLoc);
  //     }
  //   }else{
  //     if(pv_name){
  //       pv_name = pv_name.replace("RAD:","").replace(":Location-Cte","")
  //       stateLoc[0][pv_name] = props.pvs_data[pv_name].default_location;
  //       setDetLoc(stateLoc);
  //     }
  //   }
  // }

  /**
   * Watch for alert and alarm events.
   * @param value - Integrated dose measured by the PV.
   * @param pvname - PV name of the PV being measured.
   * @returns value without changes
   */
  function handleLedState<T>(value: T, pvname?: string): T {
    if(pvname){
      if(value == 'normal'){
        props.popup.remove_alert(pvname);
      }else if(value == 'alert'){
        props.popup.add_alert(pvname);
      }else if(value == 'alarm'){
        props.popup.add_alarm(pvname);
      }
    }
    return value
  }

  /**
   * Display all the detector's leds shown in the model.
   * @returns all leds in the model
   */
  function leds(default_location: DictStr): React.ReactElement[] {
    if(Object.entries(det_loc[0]).length!==0){
      default_location = det_loc[0]
    }
    return Object.entries(default_location).map(([name, loc]: [string, string]) => {
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
                modal={false}
                pvs_data={props.pvs_data}>
                  <SiriusLed
                    key={name}
                    pv_name={pvinfo["integrated_dose"]}
                    threshold={led_limits}
                    shape={probe_shape[pvinfo["probe"]]}
                    update_interval={100}
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
      {/* <SiriusInvisible
        pv_name={detectorList()}
        modifyValue={handleDetPos}/> */}
      {leds(getDefaultLocations())}
    </S.Model>
  );
};

SiriusModel.defaultProps = defaultProps;
export default SiriusModel;
