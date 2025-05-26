import React from "react";
import { iconList } from "../../assets/icons";
import { ArchiverLinkInterface } from "../../assets/interfaces/components";
import { DictStr } from "../../assets/interfaces/patterns";
import * as S from './styled';


const ArchiverLink: React.FC<ArchiverLinkInterface> = (props) => {

  function archViewerLink(): void {
    let url_arch_view: string = "http://archiver-viewer.lnls.br/?"
    const now = Date.now();
    const start_date = new Date(now - 3600000);
    const end_date = new Date(now);

    Object.values(props.pvs_data).map((value: DictStr) => {
      url_arch_view += "pv=optimized_800(" + value[props.pv_mon] + ")&";
      console.log(value)
    })
    url_arch_view += "from=" + start_date.toLocaleString();
    url_arch_view += "&to=" + end_date.toLocaleString();
    window.open(url_arch_view, '_blank');
  }
  
  return (
    <S.ArchViewer onClick={archViewerLink}>
      <S.ChartIcon
        icon={iconList['line_chart']}/>
      {props.children}
    </S.ArchViewer>
  );
};

export default ArchiverLink;
