import React from "react";
import {Chart, registerables} from 'chart.js';
import Navigation from "../../components/Navigation";
import * as S from './styled';
import Footer from "../../components/Footer";
import EpicsChart from "../../components/EpicsReact/EpicsChart";
import { led_limits, probe_type } from "../../assets/constants";
import { DictStr, ScaleType } from "../../assets/interfaces/patterns";
import Popup_List from "../../controllers/alert";
import ArchRadChart from "../../components/ArchRadChart";
import Alertlist from "../../components/Alert";
import { PageInterface } from "../../assets/interfaces/components";

const MonitorPage: React.FC<PageInterface> = (props) => {
  Chart.register(...registerables);
  const popup: Popup_List = new Popup_List();

  function getPvNames(): string[] {
    let pv_list: string[] = [];
    Object.keys(props.pvs_data).map((name: string) => {
      pv_list.push(name);
    })
    return pv_list
  }

  function getPvList(): string[] {
    let pv_list: string[] = [];
    Object.values(props.pvs_data).map((data: DictStr, idx_name: number) => {
      pv_list[idx_name] = data["integrated_dose"]
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
      <Alertlist
        popup={popup}
        pvs_data={props.pvs_data}/>
      <Navigation
        value="monitor"/>
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
          configOptions={handleOptions}
          pvs_data={props.pvs_data}/>
      </S.ChartWrapper>
      <Footer value={false}/>
    </S.Background>
  );
};

export default MonitorPage;
