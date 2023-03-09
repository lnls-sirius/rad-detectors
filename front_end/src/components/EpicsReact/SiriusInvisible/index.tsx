import React from "react";
import Epics from "../data-access/EPICS/Epics";
import { PvInterface, DictEpicsData, EpicsData } from "../assets/interfaces";

/**
 * Monitor without display some EPICS PVs
 * @param refreshInterval - Update interval in milliseconds
 * @param epics - Epics Object
 * @param timer - Timer object
 * @param pv_name - Name of the PV connected
 * @param firstValue - Load first value with more delay
 */
class SiriusInvisible extends React.Component<PvInterface>{
  private firstValue: boolean = true;
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
    this.epics = new Epics(props.pv_name);
    this.pv_name = this.savePvName();
    this.timer = setInterval(
      this.updateLabel, this.refreshInterval);
  }

  componentDidUpdate(): void {
    this.epics = new Epics(this.props.pv_name);
    this.pv_name = this.savePvName();
  }

  /**
   * Save the name of the PV in a string format
   * @returns name
   */
  savePvName(): string[] {
    if(Array.isArray(this.props.pv_name)){
      return this.props.pv_name;
    }
    return [this.props.pv_name];
  }

  /**
   * Update value with measured EPICS value
   */
  updateLabel(): void {
    const pvData: DictEpicsData = this.epics.pvData;
    this.pv_name.map((pvname: string) => {
      const pvInfo: EpicsData = pvData[pvname];
      if(pvInfo != undefined &&
        this.props.modifyValue!=undefined){
          if(pvInfo.value){
            this.props.modifyValue(
              pvInfo,
              pvname);
            this.firstValue = false;
          }
      }else{
        if(this.firstValue){
          setTimeout(this.updateLabel, 200);
        }
      }
    })
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
    return <div/>;
  }
}

export default SiriusInvisible;
