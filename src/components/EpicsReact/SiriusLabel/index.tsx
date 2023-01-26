import React from "react";
import { DictEpicsData, EpicsData } from "../../../assets/interfaces/access-data";
import { LabelPv } from "../../../assets/interfaces/components";
import { StateStr } from "../../../assets/interfaces/patterns";
import Epics from "../../../data-access/EPICS/Epics";
import SiriusTooltip from "../SiriusTooltip";

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

    if(Array.isArray(this.props.pv_name)){
      this.pv_name = props.pv_name[0];
    }else{
      this.pv_name = this.props.pv_name;
    }
    this.epics = new Epics([this.pv_name]);
    this.timer = setInterval(
      this.updateLabel, this.refreshInterval);
  }


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
      };
    }

    this.setState({
      value: label_value
    });
  }

  componentWillUnmount(): void {
    if(this.timer!=null){
      clearInterval(this.timer);
      this.epics.disconnect();
    }
  }

  showEgu(): string {
    if (this.props.egu!=undefined){
      return this.props.egu;
    }
    return "";
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
