import React, { useLayoutEffect } from "react";
import { dosage_info, dose_rate_limits, led_limits } from "../../assets/constants";
import { PvsRadInterface } from "../../assets/interfaces/access-data";
import { PvDataInterface, RadArchChartInterface } from "../../assets/interfaces/components";
import { DictNum } from "../../assets/interfaces/patterns";
import { getAxisColors, simplifyLabel } from "../../controllers/chart";
import ArchiverChart from "../ArchiverChart";
import pvs_rad from "../../assets/backend_info/pvs_rad.json";

const ArchRadChart: React.FC<RadArchChartInterface> = (props) => {
  const pvs: PvsRadInterface = pvs_rad;

  useLayoutEffect(() => {
    getPvList();
  }, []);

  function getLimits(): DictNum {
    const dose_rate: boolean = props.pv_mon.includes("dose_rate");
    if(dose_rate || props.pv_mon.includes("integrated_dose")){
      let limits_axis: DictNum = led_limits;
      if(dose_rate){
        limits_axis = dose_rate_limits;
      }
      return limits_axis;
    }
    return {};
  }

  function getPvList(): PvDataInterface[] {
    let pv_list: PvDataInterface[] = [];
    props.pv_mon.map((pv_type: string, idx: number) => {
      props.name.map((pv_name: string, idx_name: number) => {
        let id: number = (idx*props.name.length)+idx_name;
        let pvname: string = pvs[pv_name as keyof PvsRadInterface][pv_type];
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

  return (
    <ArchiverChart
      data={{}}
      pv_list={getPvList()}
      configOptions={props.configOptions}
      auto_update={true}
      limits={getLimits()}
      optimization={
        (props.pv_mon[0] == "dose_rate") ? 1000 : 0}
      interval={
        (props.pv_mon[0] == "dose_rate") ? 4 : 1}/>
  );
}

export default ArchRadChart;
