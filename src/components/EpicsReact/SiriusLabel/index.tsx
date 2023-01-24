import React from "react";
import { LabelPv } from "../../../assets/interfaces/components";
import { StateStr } from "../../../assets/interfaces/patterns";
import Epics from "../../../data-access/EPICS/Epics";
import SiriusTooltip from "../SiriusTooltip";

class SiriusLabel extends React.Component<LabelPv, StateStr>{
  private refreshInterval: number = 100;
  private epics: Epics;
  private timer: any;

  constructor(props: LabelPv) {
    super(props);

    this.updateLabel = this.updateLabel.bind(this);

    this.state = {
      value: props.state
    };

    if(props.updateInterval!=undefined){
      this.refreshInterval = props.updateInterval;
    }
    this.epics = new Epics([props.pv_name]);
    this.timer = setInterval(
      this.updateLabel, this.refreshInterval);
  }


  updateLabel(): void {
    const pvData: any = this.epics.pvData;
    const pvInfo: any = pvData[this.props.pv_name];
    let label_value: string = this.props.state;
    if(pvInfo != undefined){
      if(this.state!=null && pvInfo.value != null){
        if(pvInfo.datatype == "DBR_DOUBLE"){
          label_value = pvInfo.value.toFixed(3);
        }else{
          label_value = pvInfo.value;
        }
        if(this.props.modifyValue!=undefined){
          label_value = this.props.modifyValue(
            label_value, this.props.pv_name);
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
      <SiriusTooltip text={this.props.pv_name}>
        {this.state.value + this.showEgu()}
      </SiriusTooltip>
    );
  }
}

export default SiriusLabel;
