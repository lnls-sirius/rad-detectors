import React from "react";
import { DictEpicsData, EpicsData } from "../../../assets/interfaces/access-data";
import { PvInterface } from "../../../assets/interfaces/components";
import Epics from "../../../data-access/EPICS/Epics";

class SiriusInvisible extends React.Component<PvInterface>{
  private refreshInterval: number = 100;
  private epics: Epics;
  private timer: null|NodeJS.Timer;
  private pv_name: string[];

  constructor(props: PvInterface) {
    super(props);

    this.updateLabel = this.updateLabel.bind(this);

    if(props.updateInterval!=undefined){
      this.refreshInterval = props.updateInterval;
    }
    if(Array.isArray(this.props.pv_name)){
      this.pv_name = this.props.pv_name;
    }else{
      this.pv_name = [this.props.pv_name]
    }

    this.epics = new Epics(props.pv_name);
    this.timer = setInterval(
      this.updateLabel, this.refreshInterval);
  }


  updateLabel(): void {
    const pvData: DictEpicsData = this.epics.pvData;
    this.pv_name.map((pvname: string) => {
      const pvInfo: EpicsData = pvData[pvname];
      if(pvInfo != undefined &&
        this.props.modifyValue!=undefined &&
          typeof(pvInfo.value) == "string"){
            this.props.modifyValue(
              pvInfo.value,
              pvname);
      }
    })
  }

  componentWillUnmount(): void {
    if(this.timer!=null){
      clearInterval(this.timer);
      this.epics.disconnect();
    }
  }

  render(): React.ReactNode {
    return <div/>;
  }
}

export default SiriusInvisible;
