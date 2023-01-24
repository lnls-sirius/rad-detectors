import React from "react";
import { PvListMonitor } from "../../../assets/interfaces/components";
import Epics from "../../../data-access/EPICS/Epics";

class SiriusInvisible extends React.Component<PvListMonitor>{
  private refreshInterval: number = 100;
  private epics: Epics;
  private timer: any;

  constructor(props: PvListMonitor) {
    super(props);

    this.updateLabel = this.updateLabel.bind(this);

    if(props.updateInterval!=undefined){
      this.refreshInterval = props.updateInterval;
    }
    this.epics = new Epics(props.pv_name);
    this.timer = setInterval(
      this.updateLabel, this.refreshInterval);
  }


  updateLabel(): void {
    const pvData: any = this.epics.pvData;
    this.props.pv_name.map((pvname: string) => {
      const pvInfo: any = pvData[pvname];
      if(pvInfo != undefined){
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
