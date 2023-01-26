import React from "react";
import {Chart, registerables} from 'chart.js';
import { PvsRadInterface } from "../../assets/interfaces/access-data";
import Navigation from "../../components/Navigation";
import pvs_rad from "../../assets/backend_info/pvs_rad.json";
import * as S from './styled';
import Footer from "../../components/Footer";
import EpicsChart from "../../components/EpicsReact/EpicsChart";
import { led_limits, probe_type } from "../../assets/constants";
import { ScaleType } from "../../assets/interfaces/patterns";
import Popup_List from "../../controllers/alert";
import ArchRadChart from "../../components/ArchRadChart";

const MonitorPage: React.FC = () => {
  Chart.register(...registerables);
  const pvs: PvsRadInterface = pvs_rad;
  const popup: Popup_List = new Popup_List();

  function getPvNames(): string[] {
    let pv_list: string[] = [];
    Object.keys(pvs).map((name: string) => {
      pv_list.push(name);
    })
    return pv_list
  }

  function getPvList(): string[] {
    let pv_list: string[] = [];
    Object.keys(pvs).map((name: string, idx_name: number) => {
      pv_list[idx_name] = pvs[
        name as keyof PvsRadInterface]["integrated_dose"]
    })
    return pv_list
  }

  function handleOptions(options: Chart.ChartOptions): Chart.ChartOptions {
    if(options.scales){
      const scalesOpt: ScaleType = options.scales;
      options.plugins = {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Total Dose Rate ("+probe_type['gn']+")",
          font: {
            size: 15
          }
        }
      }
      scalesOpt.y.title = {
        display: true,
        text: "μSv/h"
      }
      scalesOpt.x.ticks.font = {
        size: 15
      }
    }

    return options;
  }

  return (
    <S.Background>
      <Navigation
        value="monitor"
        popup={popup}/>
      <S.ChartWrapper>
        <EpicsChart
          pv_name={getPvList()}
          data={{}}
          alert={led_limits.alert}
          alarm={led_limits.alarm}
          popup={popup}/>
      </S.ChartWrapper>
      <S.ChartWrapper>
        <ArchRadChart
          name={getPvNames()}
          pv_mon={["dose_rate"]}
          configOptions={handleOptions}/>
      </S.ChartWrapper>
      <Footer value={false}/>
    </S.Background>
  );
};

export default MonitorPage;
