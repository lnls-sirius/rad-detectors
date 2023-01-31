import React, { useEffect, useState } from "react";
import { ChromePicker } from 'react-color';
import { probe_name, probe_type } from "../../assets/constants";
import { iconList } from "../../assets/icons";
import { DictStr } from "../../assets/interfaces/patterns";
import { CloseIcon } from "../../assets/themes";
import * as S from './styled';

const DetectorEdit: React.FC<any> = (props): React.ReactElement => {
  const [name, setName] = useState<string>(props.detector);
  const [dose_rate, setDoseRate] = useState<string>("");
  const [probe, setProbe] = useState<string>("gn");
  const [color, setColor] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [probePvs, setProbePvs] = useState<string[]>(["", ""]);
  const [probeStsPvs, setProbeStsPvs] = useState<string[]>(["", ""]);

  useEffect(()=>{

    let detector_data: DictStr = props.dataList[props.detector];
    setName(props.detector);
    setDoseRate(detector_data.dose_rate);
    setColor(detector_data.color);
    setProbe(detector_data.probe);
    setLocation(detector_data.location);
    setProbePvs([detector_data.gamma, detector_data.neutrons]);
    if(detector_data.gamma_status_system != undefined
      && detector_data.neutrons_status_system != undefined){
        setProbeStsPvs([detector_data.gamma_status_system, detector_data.neutrons_status_system]);
    }else{
      setProbeStsPvs(["", ""]);
    }
  }, [props]);

  function componentToHex(value: number): string {
    let hexString: string = value.toString(16);
    return (hexString.length == 2)?hexString:"0"+hexString;
  }

  function rgbToHex(rgbObject: any): string {
    return "#" +
      componentToHex(rgbObject.r) +
      componentToHex(rgbObject.g) +
      componentToHex(rgbObject.b) +
      componentToHex(Math.round(255*rgbObject.a));
  }

  async function handleSave(): Promise<void> {
  }

  function showProbesPVs(): React.ReactElement[] {
    let probe_form: React.ReactElement[] = [];
    for(let x = 0; x < probe.length; x ++){
      probe_form[x] = (
        <div>
          <S.FieldWrapper>
            {probe_name[probe[x]]}:
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
            {probe_name[probe[x]]} System Status:
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

  if(props.visible){
    return (
      <S.Background onClick={()=>props.close(false)}>
        <S.Icon
          icon={iconList['save']}
          onClick={handleSave}/>
        <S.EditionWrapper onClick={e => e.stopPropagation()}>
          <CloseIcon
            icon={iconList['x']}
            onClick={()=>props.close(false)}/>
          <S.SaveIcon icon={iconList['save']}/>
          <S.FieldWrapper>
            Name:
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
            Dose Rate:
            <S.TextInput
              type="text"
              onChange={
                (evt: any)=>setDoseRate(evt.target.value)}
              value={dose_rate}/>
          </S.FieldWrapper>
          <S.FieldWrapper>
            Probe:
            <S.SelectInput
              value={probe}
              onChange={
                (evt: any)=>setProbe(evt.target.value)}>
                  <option value="gn" label={probe_type['gn']}/>
                  <option value="g" label={probe_type['g']}/>
                  <option value="n" label={probe_type['n']}/>
            </S.SelectInput>
          </S.FieldWrapper>
          <S.FieldWrapper>
            Location:
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
  }
  return <div/>
};

export default DetectorEdit;
