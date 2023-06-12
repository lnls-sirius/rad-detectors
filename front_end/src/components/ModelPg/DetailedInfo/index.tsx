import React, { createRef, useEffect, useState } from "react";
import {Chart, registerables} from 'chart.js';
import InfoBase from "../InfoBase";
import ArchRadChart from "../../ArchRadChart";
import { iconList } from "../../../assets/icons";
import { CloseIcon } from "../../../assets/themes";
import { probe_name } from "../../../assets/constants";
import { ScaleType } from "../../../assets/interfaces/patterns";
import { ModalInterface, PvDataInterface } from "../../../assets/interfaces/components";
import * as S from './styled';

/**
 * Display the Detailed InfoBase and the Archiver Chart for the
 * integrated dose, gamma dose and neutrons dose.
 * @param props
 *  pvs_data - RAD Detector's configuration data.
 *  name - name of the detector.
 *  modal - state of the detailed modal component.
 *  close - close modal function.
 * @param chartRefGN
 */

const defaultProps = {
  pvs_data: {},
  name: "",
  modal: false,
  close: ()=>null
}

const DetailedInfo: React.FC<ModalInterface> = (props) => {
  Chart.register(...registerables);
  const chartRefGN: React.RefObject<ArchRadChart> = createRef();
  const chartRefI: React.RefObject<ArchRadChart> = createRef();
  const [probe_list, setProbes] = useState<string[]>(["gamma", "neutrons"]);

  /**
   * Set probe list associated with the detector.
   */
  useEffect(()=>{
    setProbes(probes => getProbesList());
  }, [props.name])

  /**
   * Get the list of probes associated with the detector.
   */
  function getProbesList(): string[]{
    let probeList: string[] = [];
    if(props.pvs_data[props.name]){
      const probes: string = props.pvs_data[props.name].probe;
      for(let l = 0; l < probes.length; l++){
        probeList[l] = probe_name[probes[l]].toLowerCase();
      }
    }
    return probeList;
  }

  /**
   * Open in an extra window the PVs being analyzed
   * with Archiver Viewer.
   */
  function archViewerLink(): void {
    let url_arch_view: string = "https://ais-eng-srv-la.cnpem.br/archiver-viewer/?"

    if(chartRefGN.current && chartRefI.current){
      const date_interval: Date[] = chartRefGN.current.getDates();
      const gn_pvs: PvDataInterface[] = chartRefGN.current.getPvs();
      const i_pvs: PvDataInterface[] = chartRefI.current.getPvs();
      if(gn_pvs.length > 0 && i_pvs.length == 1  &&
          date_interval.length == 2){
        const pv_list: string[] = [
          chartRefI.current.getPvs()[0].name];
        if(probe_list.includes('gamma') || gn_pvs.length<2){
          pv_list.push(gn_pvs[0].name);
        }
        if(probe_list.includes('neutrons') && gn_pvs.length==2){
          pv_list.push(gn_pvs[1].name);
        }
        url_arch_view += "pv=" + pv_list[0].toString();
        url_arch_view += "&pv=" + pv_list[1].toString();
        if(gn_pvs.length > 1){
          url_arch_view += "&pv=" + pv_list[2].toString();
        }
        url_arch_view += "&from=" + date_interval[0].toLocaleString();
        url_arch_view += "&to=" + date_interval[1].toLocaleString();
        window.open(url_arch_view, '_blank');
      }
    }
  }

  /**
   * Change the options of the Archiver Chart.
   * @param options - Chart options.
   * @param pv_name - name of the PV being analised.
   * @returns options
   */
  function handleOptions(options: Chart.ChartOptions, pv_name: PvDataInterface[]): Chart.ChartOptions {
    if(options.scales){
      const scalesOpt: ScaleType = options.scales;
      const plugins: any = options.plugins;
      plugins.legend = {
        display: true,
        onClick: function(e: any) {
          e.stopPropagation();
        }
      }
      plugins.title = {
        display: false
      }
      if(pv_name.length > 0 && pv_name[0].name != undefined){
        scalesOpt.y.title = {
          display: true,
          text: (pv_name[0].name.includes("Dose"))?
            "μSv":"μSv/h"
        }
      }
    }
    return options;
  }

  /**
   * Display the Detailed InfoBase and the Archiver Chart for the
   * integrated dose, gamma dose and neutrons dose.
   */
  function showModal(): React.ReactElement {
    if(props.modal){
      return(
        <S.ModalContainer
          value={props.modal}
          onClick={()=>props.close(false)}>
            <S.Content
              onClick={e => e.stopPropagation()}>
                <CloseIcon
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
                    pvs_data={props.pvs_data}/>
                  <S.ChartWrapper>
                    <ArchRadChart
                      ref={chartRefI}
                      name={[props.name]}
                      pv_mon={["integrated_dose"]}
                      configOptions={handleOptions}
                      pvs_data={props.pvs_data}/>
                  </S.ChartWrapper>
                  <S.ChartWrapper>
                    <ArchRadChart
                      ref={chartRefGN}
                      name={[props.name]}
                      pv_mon={probe_list}
                      configOptions={handleOptions}
                      pvs_data={props.pvs_data}/>
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

DetailedInfo.defaultProps = defaultProps;
export default DetailedInfo;
