import React from "react";
import { StateNum, LedPv } from "../../../assets/interfaces";
import Epics from "../../../data-access/EPICS/Epics";
import SiriusTooltip from "../SiriusTooltip";
import * as S from './styled';

class SiriusLed extends React.Component<LedPv, StateNum>{
  private refreshInterval: number= 100;
  private epics: Epics;
  private timer: any;

  constructor(props: LedPv) {
    super(props);

    this.updateLed = this.updateLed.bind(this);

    this.state = {
      value: 3
    };
    if(props.updateInterval!=undefined){
      this.refreshInterval = props.updateInterval;
    }
    this.epics = new Epics([props.pv_name]);
    this.timer = setInterval(
      this.updateLed, this.refreshInterval);
  }

  updateLed(): void {
    let pvData: any = this.epics.pvData;
    const pvInfo: any = pvData[this.props.pv_name];
    let led_value: number = 3;
    if(this.state!=null && pvInfo.value != null){
      if(pvInfo.datatype == "DBR_DOUBLE"){
        led_value = this.alert_alarm(pvInfo.value);
      }else{
        led_value = pvInfo.value;
      }
    };

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
      <SiriusTooltip text={this.props.pv_name}>
        <S.LedWrapper
          state={this.state.value}
          shape={shape}/>
      </SiriusTooltip>
    );
  }
}

export default SiriusLed;
