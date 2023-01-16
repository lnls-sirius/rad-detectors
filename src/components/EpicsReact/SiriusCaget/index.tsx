import React from "react";
import { DictString, PvListInterface } from "../../../assets/interfaces";
import Epics from "../../../data-access/EPICS/Epics";

class SiriusCaget extends React.Component<PvListInterface>{
  private epics: Epics;
  private error: boolean;
  private timer: any;
  private pv_valueList: DictString;

  constructor(props: PvListInterface) {
    super(props);
    this.epics = new Epics(props.pv_list);
    this.updateLocations = this.updateLocations.bind(this);
    this.timer = setInterval(
      this.updateLocations, 100);
    this.pv_valueList = {};
    this.error = false;
  }


  public updateLocations(): void {
    const pvData: any = this.epics.pvData;
    this.error = false;
    Object.entries(pvData).map(([name, data]: any)=>{
      if(data.value!=null){
        this.pv_valueList[name] = data.value;
      }else{
        this.error = true;
      }
    });
  }

  componentWillUnmount(): void {
    this.epics.disconnect();
  }

}

export default SiriusCaget;
