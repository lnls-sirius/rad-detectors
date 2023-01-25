import React, { createRef } from "react";
import {Chart, registerables} from 'chart.js';
import { ModalInterface } from "../../assets/interfaces/components";
import * as S from './styled';
import InfoBase from "../InfoBase";
import { iconList } from "../../assets/icons";
import ArchiverChart from "../ArchiverChart";


const DetailedInfo: React.FC<ModalInterface> = (props) => {
  Chart.register(...registerables);
  const chartRefGN: any = createRef();
  const chartRefI: any = createRef();

  function archViewerLink(): void {
    let url_arch_view: string = "http://ais-eng-srv-ta.cnpem.br/archiver-viewer/?"
    let date_interval: Date[] = chartRefGN.current.getDateInterval();
    let pv_list: string[] = chartRefGN.current.getPvList().concat(
      chartRefI.current.getPvList());

    if(pv_list.length == 3 && date_interval.length == 2){
      url_arch_view += "pv=" + pv_list[0].toString();
      url_arch_view += "&pv=" + pv_list[1].toString();
      url_arch_view += "&pv=" + pv_list[2].toString();
      url_arch_view += "&from=" + date_interval[0].toDateString();
      url_arch_view += "&to=" + date_interval[1].toDateString();
      window.open(url_arch_view, '_blank');
    }
  }

  function handleOptions(options: any): any {
    const scales: any = options.scales;
    options.plugins = {
      legend: {
        display: true
      },
      title: {
        display: false
      }
    }
    scales.y.ticks = {
      font: {
        size: 15
      },
      title: {
        display: true,
        text: "μSv/h"
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
                    <ArchiverChart
                      id={0}
                      ref={chartRefGN}
                      name={[props.name]}
                      data={{}}
                      pv_mon={
                        ["neutrons",
                          "gamma"]}
                      auto_update={true}
                      label="μSv/h"/>
                  </S.ChartWrapper>
                  <S.ChartWrapper>
                    <ArchiverChart
                      id={0}
                      ref={chartRefI}
                      name={[props.name]}
                      data={{}}
                      pv_mon={
                        ["integrated_dose"]}
                      auto_update={true}
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
