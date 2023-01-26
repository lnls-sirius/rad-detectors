import React, { Component, createRef } from "react";
import { dosage_info, dose_rate_limits, led_limits } from "../../assets/constants";
import { PvsRadInterface } from "../../assets/interfaces/access-data";
import { PvDataInterface, RadArchChartInterface } from "../../assets/interfaces/components";
import { DictNum } from "../../assets/interfaces/patterns";
import { getAxisColors, simplifyLabel } from "../../controllers/chart";
import ArchiverChart from "../ArchiverChart";
import pvs_rad from "../../assets/backend_info/pvs_rad.json";

class ArchRadChart extends Component<RadArchChartInterface>{
  private pvs: PvsRadInterface = pvs_rad;
  private chartRef: React.RefObject<ArchiverChart> = createRef();

  constructor(props: RadArchChartInterface){
    super(props);
    this.getPvList();
  }

  getDates(): Date[]{
    if(this.chartRef.current){
      return this.chartRef.current.getDateInterval();
    }
    return []
  }

  getPvs(): PvDataInterface[]{
    if(this.chartRef.current){
      return this.chartRef.current.getPvList();
    }
    return []
  }

  getLimits(): DictNum {
    const dose_rate: boolean = this.props.pv_mon.includes("dose_rate");
    if(dose_rate || this.props.pv_mon.includes("integrated_dose")){
      let limits_axis: DictNum = led_limits;
      if(dose_rate){
        limits_axis = dose_rate_limits;
      }
      return limits_axis;
    }
    return {};
  }

  getPvList(): PvDataInterface[] {
    let pv_list: PvDataInterface[] = [];
    this.props.pv_mon.map((pv_type: string, idx: number) => {
      this.props.name.map((pv_name: string, idx_name: number) => {
        let id: number = (idx*this.props.name.length)+idx_name;
        let pvname: string = this.pvs[pv_name as keyof PvsRadInterface][pv_type];
        pv_list[id] = {
          name: pvname,
          label: (pv_type=="dose_rate")?
            simplifyLabel(pvname):dosage_info[pv_type].label,
          color: getAxisColors(pv_type, pv_name)
        }
      })
    })
    return pv_list
  }

  render(){
    return (
      <ArchiverChart
        ref={this.chartRef}
        data={{}}
        pv_list={this.getPvList()}
        configOptions={this.props.configOptions}
        auto_update={true}
        limits={this.getLimits()}
        optimization={
          (this.props.pv_mon[0] == "dose_rate") ? 1000 : 0}
        interval={
          (this.props.pv_mon[0] == "dose_rate") ? 4 : 1}/>
    );
  }
}

export default ArchRadChart;
