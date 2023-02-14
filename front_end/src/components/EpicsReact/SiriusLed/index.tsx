import React from "react";
import SiriusTooltip from "../SiriusTooltip";
import Epics from "../../../data-access/EPICS/Epics";
import { DictEpicsData, EpicsData } from "../../../assets/interfaces/access-data";
import { LedPv } from "../../../assets/interfaces/components";
import { StateNum } from "../../../assets/interfaces/patterns";
import * as S from './styled';

/**
 * Show a default Led display for EPICS
 * @param props
 *   - shape - Led shape
 *   - alert - Alert limit value
 *   - alarm - Alarm limit value
 * @param refreshInterval - Update interval in milliseconds
 * @param epics - Epics Object
 * @param timer - Timer object
 * @param pv_name - Name of the PV connected
 * @param value - Current state of the led
 */
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
    this.pv_name = this.savePvName();
    this.epics = this.handleEpics();
    this.timer = setInterval(
      this.updateLed, this.refreshInterval);
    this.updateLed();
    this.timer = null;
  }

  /**
   * Save PV name with update
   */
  componentDidUpdate(): void {
    this.pv_name = this.savePvName();
  }

  /**
   * Connect the pv to EPICS
   * @returns epics
   */
  handleEpics(): Epics {
    if(this.props.pv_name.length != 0){
      return new Epics([this.pv_name]);
    }
    return new Epics(["FakePV"]);
  }

  /**
   * Save the name of the PV in a string format
   * @returns name
   */
  savePvName(): string {
    if(Array.isArray(this.props.pv_name)){
      return this.props.pv_name[0];
    }
    return this.props.pv_name;
  }

  /**
   * Update led color with measured EPICS value
   */
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

  /**
   * Verify for alert or alarm state
   */
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

  /**
   * Unmount Component
   */
  componentWillUnmount(): void {
    if(this.timer!=null){
      clearInterval(this.timer);
      this.epics.disconnect();
    }
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
