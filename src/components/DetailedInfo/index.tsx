import React, { createRef } from "react";
import {Chart, registerables} from 'chart.js';
import { ModalInterface, PvDataInterface } from "../../assets/interfaces/components";
import * as S from './styled';
import InfoBase from "../InfoBase";
import { iconList } from "../../assets/icons";
import { ScaleType } from "../../assets/interfaces/patterns";
import ArchRadChart from "../ArchRadChart";


const DetailedInfo: React.FC<ModalInterface> = (props) => {
  Chart.register(...registerables);
  const chartRefGN: React.RefObject<ArchRadChart> = createRef();
  const chartRefI: React.RefObject<ArchRadChart> = createRef();

  function archViewerLink(): void {
    let url_arch_view: string = "http://ais-eng-srv-ta.cnpem.br/archiver-viewer/?"

    if(chartRefGN.current && chartRefI.current){
      const date_interval: Date[] = chartRefGN.current.getDates();
      const gn_pvs: PvDataInterface[] = chartRefGN.current.getPvs();
      const i_pvs: PvDataInterface[] = chartRefI.current.getPvs();
      if(gn_pvs.length == 2 && i_pvs.length == 1  &&
          date_interval.length == 2){
        const pv_list: string[] = [
          gn_pvs[0].name,
          gn_pvs[1].name,
          chartRefI.current.getPvs()[0].name];
        url_arch_view += "pv=" + pv_list[0].toString();
        url_arch_view += "&pv=" + pv_list[1].toString();
        url_arch_view += "&pv=" + pv_list[2].toString();
        url_arch_view += "&from=" + date_interval[0].toDateString();
        url_arch_view += "&to=" + date_interval[1].toDateString();
        window.open(url_arch_view, '_blank');
      }
    }
  }

  function handleOptions(options: Chart.ChartOptions, pv_name: PvDataInterface[]): Chart.ChartOptions {
    if(options.scales){
      const scalesOpt: ScaleType = options.scales;
      options.plugins = {
        legend: {
          display: true
        },
        title: {
          display: false
        }
      }
      scalesOpt.y.title = {
        display: true,
        text: (pv_name[0].name.includes("Dose"))?
          "μSv":"μSv/h"
      }
    }
    return options;
  }

  function showModal(): React.ReactElement {
    if(props.modal){
      return(
        <S.ModalContainer
          value={props.modal}
          onClick={()=>props.close(false)}>
            <S.Content
              onClick={e => e.stopPropagation()}>
                <S.Close
                  icon={iconList['x']}
                  onClick={()=>props.close(false)}/>
                <S.ArchViewer
                    onClick={()=>archViewerLink()}>
                  <S.ChartIcon
                    icon={iconList['line_chart']}/>
                </S.ArchViewer>
                <S.Body>
                  <InfoBase
                    name={props.name}
                    modal={true}
                    children={null}/>
                  <S.ChartWrapper>
                    <ArchRadChart
                      ref={chartRefI}
                      name={[props.name]}
                      pv_mon={["integrated_dose"]}
                      configOptions={handleOptions}/>
                  </S.ChartWrapper>
                  <S.ChartWrapper>
                    <ArchRadChart
                      ref={chartRefGN}
                      name={[props.name]}
                      pv_mon={["neutrons", "gamma"]}
                      configOptions={handleOptions}/>
                  </S.ChartWrapper>
                </S.Body>
            </S.Content>
          </S.ModalContainer>
      );
    }
    return <div/>;
  }

  return (
    <div>
      {showModal()}
    </div>
  )
};
export default DetailedInfo;
