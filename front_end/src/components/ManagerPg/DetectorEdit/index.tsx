import React, { useEffect, useState } from "react";
import { ChromePicker } from 'react-color';
import Detectors_List from "../../../controllers/pvs_data";
import locations from "../../../assets/files/det_locations.json";
import { probe_name, probe_type } from "../../../assets/constants";
import { iconList } from "../../../assets/icons";
import { CloseIcon } from "../../../assets/themes";
import { EditDetInterface, ModelLocations } from "../../../assets/interfaces/components";
import { DDictStr, DictStr } from "../../../assets/interfaces/patterns";
import * as S from './styled';

/**
 *
 * @param props
 *  - detector - Selected detector
 *  - detList - Detector list object
 *  - close - Close modal function
 * @param name - Name of the detector
 * @param dose_rate - Dose Rate PV
 * @param probe - Probe types
 * @param color - Color of the detector axis
 * @param location - PV of the location of the detector
 * @param def_location - Default location of the detector
 * @param probePVs - PVs associated with the probe
 * @param probeStsPvs - PVs associated with the system status of the probes
 */

const defaultProps = {
  detector: '',
  detList: new Detectors_List(),
  close: () => null
}

const DetectorEdit: React.FC<EditDetInterface> = (props): React.ReactElement => {
  const [name, setName] = useState<string>(props.detector);
  const [dose_rate, setDoseRate] = useState<string>("TotalDoseRate");
  const [probe, setProbe] = useState<string>("gn");
  const [color, setColor] = useState<string>("#000000");
  const [location, setLocation] = useState<string>("Location-Cte");
  const [def_location, setDefLocation] = useState<string>("ha01");
  const [probePvs, setProbePvs] = useState<string[]>(["Gamma", "Neutron"]);
  const [probeStsPvs, setProbeStsPvs] = useState<string[]>(["Gamma:SystemStatus", "Neutron:SystemStatus"]);

  useEffect(()=>{
    if(props.detector != ""){
      const det: string = props.detector;
      let detector_data: DictStr = props.pvs_data[det];
      let probesPvsTemp: string[] = ["",""];
      setName(det);
      setDoseRate(simplifyName(detector_data.dose_rate, det));
      setColor(simplifyName(detector_data.color, det));
      setProbe(simplifyName(detector_data.probe, det));
      setLocation(simplifyName(detector_data.location, det));
      setDefLocation(detector_data.default_location);
      if(detector_data.gamma){
        probesPvsTemp[0] = detector_data.gamma;
      }
      if(detector_data.neutrons){
        probesPvsTemp[1] = detector_data.neutrons;
      }
      setProbePvs([
        simplifyName(probesPvsTemp[0], det),
        simplifyName(probesPvsTemp[1], det)]);
      if(detector_data.gamma_status_system != undefined
        && detector_data.neutrons_status_system != undefined){
          setProbeStsPvs([
            simplifyName(detector_data.gamma_status_system, det),
            simplifyName(detector_data.neutrons_status_system, det)]);
      }else{
        setProbeStsPvs(["", ""]);
      }
    }
  }, [props]);

  /**
   * Transform number to hexadecimal string
   * @param value - value to hexadecimal string
   * @returns hexadecimal string
   */
  function componentToHex(value: number): string {
    let hexString: string = value.toString(16);
    return (hexString.length == 2)?hexString:"0"+hexString;
  }

  /**
   * Convert RGB value to hex string
   * @param rgbObject - RGB object
   * @returns color string
   */
  function rgbToHex(rgbObject: any): string {
    return "#" +
      componentToHex(rgbObject.r) +
      componentToHex(rgbObject.g) +
      componentToHex(rgbObject.b) +
      componentToHex(Math.round(255*rgbObject.a));
  }

  /**
   * Generate a PV with the RAD prefix
   * @param device - device name
   * @param sufix - suffix string
   * @returns PV name
   */
  function buildPvName(device: string, sufix: string): string {
    return "RAD:" + device + ":" + sufix;
  }

  /**
   * Simplify RAD PV name
   * @param name - PV name
   * @param device - device name
   * @returns simplified PV name
   */
  function simplifyName(name: string, device: string): string {
      return name.replace("RAD:","").replace(device+":", "");
  }

  /**
   * Save a new detector and delete the old one if it exists
   */
  function handleSave(): void {
    let newPvList: DDictStr = props.pvs_data;
    const detector_data: DictStr = props.pvs_data[props.detector];

    if(props.detector in props.pvs_data) {
      delete newPvList[props.detector];
    }
    newPvList[name] = {
      'probe': probe,
      'gamma': buildPvName(name, probePvs[0]),
      'neutrons': buildPvName(name, probePvs[1]),
      'integrated_dose': buildPvName(name, dose_rate),
      'dose_rate': buildPvName(name, dose_rate),
      'location': buildPvName(name, location),
      'color': color,
      'default_location': def_location
    }

    if(probe.length == 1){
      if(probe == 'g'){
        delete newPvList[name]['neutrons'];
      }else{
        delete newPvList[name]['gamma'];
      }
    }

    if(detector_data){
      if(detector_data.gamma_status_system != undefined
        && detector_data.neutrons_status_system != undefined){
          if(probe == 'g'){
            newPvList[name]['neutrons_status_system'] = buildPvName(name, probeStsPvs[1])
          }else{
            newPvList[name]['gamma_status_system'] = buildPvName(name, probeStsPvs[0])
          }
      }
    }
    
    props.detList.update_detectors({...newPvList});
    props.close(false);
    props.saveFlag();
  }

  /**
   * Show Probe PV and Status acording to the probe variable
   */
  function showProbesPVs(): React.ReactElement[] {
    let probe_form: React.ReactElement[] = [];
    for(let x = 0; x < probe.length; x ++){
      probe_form[x] = (
        <div>
          <S.FieldWrapper>
            <S.TextWrapper>
              {probe_name[probe[x]]}:
            </S.TextWrapper>
            <S.TextInput
              type="text"
              value={probePvs[x]}
              onChange={
                (evt: any)=>{
                  let probe_pvs = [...probePvs];
                  probe_pvs[x] = evt.target.value;
                  setProbePvs(probe_pvs);}
                }/>
          </S.FieldWrapper>
          <S.FieldWrapper>
            <S.TextWrapper>
              {probe_name[probe[x]]} System Status:
            </S.TextWrapper>
            <S.TextInput
              type="text"
              value={probeStsPvs[x]}
              onChange={
                (evt: any)=>{
                  let probe_pvs = [...probeStsPvs];
                  probe_pvs[x] = evt.target.value;
                  setProbeStsPvs(probe_pvs);}
                }/>
          </S.FieldWrapper>
        </div>
      );
    }
    return probe_form
  }

  function getDefaultLocationOptions(): React.ReactElement[] {
    const model_location: ModelLocations = locations;
    return Object.keys(model_location).map((name: string) => {
      return (
        <option value={name} label={name}/>
      )
    });
  }

  return (
    <S.Background onClick={()=>props.close(false)}>
      <S.EditionWrapper onClick={e => e.stopPropagation()}>
        <CloseIcon
          icon={iconList['x']}
          onClick={()=>props.close(false)}/>
        <S.SaveIcon
          icon={iconList['save']}
          onClick={()=>handleSave()}/>
        <S.FieldWrapper>
          <S.TextWrapper>
            Name:
          </S.TextWrapper>
          <S.TextInput
            type="text"
            onChange={
              (evt: any)=>setName(evt.target.value)}
            value={name}/>
          <S.ColorSquare
            value={color}>
              <S.ColorPicker>
                <ChromePicker
                  color={color}
                  onChange={
                    (color: any)=>setColor(rgbToHex(color.rgb))}/>
              </S.ColorPicker>
          </S.ColorSquare>
        </S.FieldWrapper>
        <S.FieldWrapper>
          <S.TextWrapper>
            Dose Rate:
          </S.TextWrapper>
          <S.TextInput
            type="text"
            onChange={
              (evt: any)=>setDoseRate(evt.target.value)}
            value={dose_rate}/>
        </S.FieldWrapper>
        <S.FieldWrapper>
          <S.TextWrapper>
            Probe:
          </S.TextWrapper>
          <S.SelectInput
            value={probe}
            onChange={
              (evt: any)=>setProbe(evt.target.value)}>
                <option value="gn" label={probe_type['gn']}/>
                <option value="g" label={probe_type['g']}/>
                <option value="n" label={probe_type['n']}/>
          </S.SelectInput>
          <S.TextWrapper>
            Default Location:
          </S.TextWrapper>
          <S.SelectInput
            value={def_location}
            onChange={
              (evt: any)=>setDefLocation(evt.target.value)}>
                {getDefaultLocationOptions()}
          </S.SelectInput>
        </S.FieldWrapper>
        <S.FieldWrapper>
          <S.TextWrapper>
            Location:
          </S.TextWrapper>
          <S.TextInput
            type="text"
            onChange={
              (evt: any)=>setLocation(evt.target.value)}
            value={location}/>
        </S.FieldWrapper>
        {showProbesPVs()}
      </S.EditionWrapper>
    </S.Background>
  );
};

DetectorEdit.defaultProps = defaultProps;
export default DetectorEdit;
