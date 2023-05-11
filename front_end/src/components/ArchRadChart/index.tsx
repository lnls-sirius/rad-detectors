import React, { Component, createRef } from "react";
import ArchiverChart from "../ArchiverChart";
import { getAxisColors, location_text, simplifyLabel } from "../../controllers/chart";
import { dosage_info, dose_rate_limits, led_limits } from "../../assets/constants";
import { PvsRadInterface } from "../../assets/interfaces/access-data";
import { PvDataInterface, RadArchChartInterface } from "../../assets/interfaces/components";
import { DictNum, DictStr } from "../../assets/interfaces/patterns";

/**
 * Adapt the RAD Detectors charts to the Archiver Chart component
 * @param chartRef - Reference of the Archiver Chart
 */
class ArchRadChart extends Component<RadArchChartInterface>{
  private chartRef: React.RefObject<ArchiverChart> = createRef();

  constructor(props: RadArchChartInterface){
    super(props);
    this.getPvList();
  }

  /**
   * Get the date interval of the Archiver Chart
   * @returns [start date, end date]
   */
  getDates(): Date[]{
    if(this.chartRef.current){
      return this.chartRef.current.getDateInterval();
    }
    return []
  }

  /**
   * Get the PV list of the Archiver Chart
   * @returns pv list
   */
  getPvs(): PvDataInterface[]{
    if(this.chartRef.current){
      return this.chartRef.current.getPvList();
    }
    return []
  }

  /**
   * Get a dictionary of the limit axis to be displayed in the chart
   * @returns str<name>: number
   */
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

  /**
   * Generate a PV List based on the RAD PV pattern with
   * the pv_mon and name given in the props.
   * @returns str<name>: {
   *  name: string,
   *  label: string,
   *  color: string
   * }
   */
  getPvList(): PvDataInterface[] {
    let pv_list: PvDataInterface[] = [];
    this.props.pv_mon.map((pv_type: string, idx: number) => {
      this.props.name.map(async (pv_name: string, idx_name: number) => {
        let id: number = (idx*this.props.name.length)+idx_name;
        let pvname: string = this.props.pvs_data[
          pv_name as keyof PvsRadInterface][pv_type];
        const det_data: DictStr = this.props.pvs_data[pv_name as keyof PvsRadInterface];
        let label: string;
        if(pv_type=="dose_rate"){
          label = location_text(det_data, simplifyLabel(pvname), false)[0]
        }else{
          label = dosage_info[pv_type].label
        }
        pv_list[id] = {
          name: pvname,
          label: label,
          color: getAxisColors(
            pv_type, det_data)
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
        updateInterval={
          (this.props.pv_mon[0] == "dose_rate") ? 700 : 1000}
        configOptions={this.props.configOptions}
        auto_update={true}
        limits={this.getLimits()}
        optimization={
          (this.props.pv_mon[0] == "dose_rate") ? 2000: -1}
        interval={1}/>
    );
  }
}

export default ArchRadChart;
