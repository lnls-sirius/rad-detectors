import React from "react";
import { DictEpicsData, EpicsData } from "../../../assets/interfaces/access-data";
import { LabelPv } from "../../../assets/interfaces/components";
import { StateStr } from "../../../assets/interfaces/patterns";
import Epics from "../../../data-access/EPICS/Epics";
import SiriusTooltip from "../SiriusTooltip";

/**
 * Show a default Label display for EPICS
 * @param props
 *   - state - Initial state of the PV
 * @param refreshInterval - Update interval in milliseconds
 * @param epics - Epics Object
 * @param timer - Timer object
 * @param pv_name - Name of the PV connected
 */
class SiriusLabel extends React.Component<LabelPv, StateStr>{
  private refreshInterval: number = 100;
  private epics: Epics;
  private timer: null|NodeJS.Timer;
  private pv_name: string;

  constructor(props: LabelPv) {
    super(props);

    this.updateLabel = this.updateLabel.bind(this);

    this.state = {
      value: props.state
    };

    if(props.updateInterval!=undefined){
      this.refreshInterval = props.updateInterval;
    }
    this.pv_name = this.savePvName();
    this.epics = this.handleEpics();
    this.updateLabel();
    this.timer = setInterval(
      this.updateLabel, this.refreshInterval);
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
   * Update label with measured EPICS value
   */
  updateLabel(): void {
    const pvData: DictEpicsData = this.epics.pvData;
    const pvInfo: EpicsData = pvData[this.pv_name];
    let label_value: string = this.props.state;
    if(pvInfo != undefined){
      if(this.state!=null &&
          pvInfo.value != null){
            if(pvInfo.datatype == "DBR_DOUBLE" &&
              typeof(pvInfo.value) == "number"){
                label_value = pvInfo.value.toFixed(3);
            }else{
              label_value = pvInfo.value.toString();
            }
            if(this.props.modifyValue!=undefined){
              label_value = this.props.modifyValue(
                label_value, this.pv_name);
            }
      }else{
        label_value = "NC";
      }
    }

    this.setState({
      value: label_value
    });
  }

  /**
   * Show unit of the PV being measured
   * @returns egu
   */
  showEgu(): string {
    if (this.props.egu!=undefined){
      return this.props.egu;
    }
    return "";
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

    return(
      <SiriusTooltip text={this.pv_name}>
        {this.state.value + this.showEgu()}
      </SiriusTooltip>
    );
  }
}

export default SiriusLabel;
