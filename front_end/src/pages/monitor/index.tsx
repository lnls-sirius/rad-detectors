import React, { useState } from "react";
import {Chart, registerables} from 'chart.js';
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ArchRadChart from "../../components/ArchRadChart";
import Alertlist from "../../components/Alert";
import Popup_List from "../../controllers/alert";
import BarChart from "../../components/BarChart";
import DetailedInfo from "../../components/ModelPg/DetailedInfo";
import { probe_type } from "../../assets/constants";
import { PvData, ScaleType } from "../../assets/interfaces/patterns";
import * as S from './styled';

/**
 *
 * The monitor page shows a bar chart of the current integrated dose and a line chart of the
 * dose rate of the last hour of all the radiation detectors.
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
  const [modal, setModal] = useState<boolean>(false);
  const [detector, setDetector] = useState<string>("ELSE");

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
      const plugins: any = options.plugins;
      let font_size: number = 13;
      if(window.innerWidth > 2500){
        font_size = 30;
      }

      plugins.legend = {
        display: false
      }
      plugins.title = {
        display: true,
        text: "Total Dose Rate ("+probe_type['gn']+")",
        font: {
          size: font_size
        }
      }
      scalesOpt.y.title = {
        display: true,
        text: "μSv/h",
        font: {
          size: font_size
        }
      }

      scalesOpt.y.ticks = {
        font: {
          size: font_size
        }
      }
      scalesOpt.x.ticks.font = {
        size: font_size
      }
    }

    return options;
  }

  return (
    <S.Background>
      <DetailedInfo
        name={detector}
        modal={modal}
        close={setModal}
        pvs_data={props.pvs_data}/>
      <Alertlist
        popup={popup}
        pvs_data={props.pvs_data}
        setModal={setModal}
        setDetector={setDetector}/>
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
