import React from "react";
import { DictEpicsData, EpicsData } from "../../../assets/interfaces/access-data";
import { LedPv } from "../../../assets/interfaces/components";
import { StateNum } from "../../../assets/interfaces/patterns";
import Epics from "../../../data-access/EPICS/Epics";
import SiriusTooltip from "../SiriusTooltip";
import * as S from './styled';

class SiriusLed extends React.Component<LedPv, StateNum>{
  private refreshInterval: number= 100;
  private epics: Epics;
  private timer: null|NodeJS.Timer;
  private pv_name: string;

  constructor(props: LedPv) {
    super(props);

    this.updateLed = this.updateLed.bind(this);

    this.state = {
      value: 3
    };
    if(props.updateInterval!=undefined){
      this.refreshInterval = props.updateInterval;
    }
    if(Array.isArray(this.props.pv_name)){
      this.pv_name = props.pv_name[0];
    }else{
      this.pv_name = this.props.pv_name;
    }
    this.epics = new Epics([props.pv_name]);
    this.timer = setInterval(
      this.updateLed, this.refreshInterval);
  }

  updateLed(): void {
    let pvData: DictEpicsData = this.epics.pvData;
    const pvInfo: EpicsData = pvData[this.pv_name];
    let led_value: number = 3;
    if(pvInfo != undefined){
      if(this.state!=null &&
          pvInfo.value != null &&
            typeof(pvInfo.value) == "number"){
        if(pvInfo.datatype == "DBR_DOUBLE"){
          led_value = this.alert_alarm(pvInfo.value);
        }else{
          led_value = pvInfo.value;
        }
        if(this.props.modifyValue!=undefined){
          led_value = this.props.modifyValue(
            led_value, this.pv_name);
        }
      };
    }

    this.setState({
      value: led_value
    });
  }

  componentWillUnmount(): void {
    if(this.timer!=null){
      clearInterval(this.timer);
      this.epics.disconnect();
    }
  }

  alert_alarm(value: number): number {
    if(this.props.alarm!=undefined){
      if(value >= this.props.alarm){
        return 2;
      }
    }
    if(this.props.alert != undefined){
      if(value >= this.props.alert){
        return 1;
      }
    }
    return 0;
  }

  render(): React.ReactNode {
    const {shape} = this.props;

    return(
      <SiriusTooltip text={this.pv_name}>
        <S.LedWrapper
          state={this.state.value}
          shape={shape}/>
      </SiriusTooltip>
    );
  }
}

export default SiriusLed;
