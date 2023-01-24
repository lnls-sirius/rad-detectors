import React from "react";
import { PvsRadInterface } from "../../assets/interfaces/access-data";
import Controls from "../../components/Controls";
import pvs_rad from "../../assets/backend_info/pvs_rad.json";
import * as S from './styled';
import Footer from "../../components/Footer";
import ArchiverChart from "../../components/ArchiverChart";
import EpicsChart from "../../components/EpicsReact/EpicsChart";
import { led_limits, probe_type } from "../../assets/constants";

const MonitorPage: React.FC = () => {
  const pvs: PvsRadInterface = pvs_rad;

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

  function handleOptions(options: any): any {
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
    options.scales.y.ticks = {
      font: {
        size: 15
      }
    }
    options.scales.x.ticks.font = {
      size: 15
    }
    return options;
  }

  return (
    <S.Background>
      <Controls value="monitor"/>
      <S.ChartWrapper>
        <EpicsChart
          id={0}
          name={getPvList()}
          data={{}}
          alert={led_limits.alert}
          alarm={led_limits.alarm}/>
      </S.ChartWrapper>
      <S.ChartWrapper>
        <ArchiverChart
          id={0}
          name={getPvNames()}
          data={{}}
          pv_mon={["dose_rate"]}
          configOptions={handleOptions}/>
      </S.ChartWrapper>
      <Footer value={false}/>
    </S.Background>
  );
};

export default MonitorPage;
