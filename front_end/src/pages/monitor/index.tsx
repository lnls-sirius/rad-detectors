import React from "react";
import {Chart, registerables} from 'chart.js';
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ArchRadChart from "../../components/ArchRadChart";
import Alertlist from "../../components/Alert";
import Popup_List from "../../controllers/alert";
import { probe_type } from "../../assets/constants";
import { PvData, ScaleType } from "../../assets/interfaces/patterns";
import * as S from './styled';
import BarChart from "../../components/BarChart";

/**
 *
 * The monitor page shows a bar chart of the current integrated dose and a line chart of the
 * dose rate of the last 4 hours of all the radiation detectors.
 *
 * @param props
 *  - pvs_data: Contains the radiation detectors configuration data
 * @param popup - Stores an object for monitoring and registering alerts and alarms.
 *
 * @returns Page Component
 */

const defaultProps: PvData = {
  pvs_data: {}
};

const MonitorPage: React.FC<PvData> = (props) => {
  Chart.register(...registerables);
  const popup: Popup_List = new Popup_List();

  /**
   * Get a list of all the key names in the radiation detectors configuration data
  */
  function getPvNames(): string[] {
    let pv_list: string[] = [];
    Object.keys(props.pvs_data).map((name: string) => {
      pv_list.push(name);
    })
    return pv_list
  }

  /**
   * Modify the options of the base Archiver Chart
  */
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
      {/* <Alertlist
        popup={popup}
        pvs_data={props.pvs_data}/> */}
      <Navigation
        value="monitor"/>
      <S.ChartWrapper>
        <BarChart
          popup={popup}
          pvs_data={props.pvs_data}/>
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

MonitorPage.defaultProps = defaultProps;
export default MonitorPage;
