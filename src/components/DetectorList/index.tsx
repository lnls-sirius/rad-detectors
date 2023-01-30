import React, { useState } from "react";
import pvs_rad from "../../assets/backend_info/pvs_rad.json";
import { iconList } from "../../assets/icons";
import { PvsRadInterface } from "../../assets/interfaces/access-data";
import { DictStr } from "../../assets/interfaces/patterns";
import * as S from './styled';

const Detector_List: React.FC = (): React.ReactElement => {
  const [detectors, setDetectors] = useState<PvsRadInterface>(pvs_rad);

  function show_list(): React.ReactElement[] {
    return Object.entries(detectors).map(([det_id, data]: [string, DictStr])=>{
      return (
        <S.ItemWrapper>
          <S.Text>{det_id}</S.Text>
          {data.probe.toUpperCase()}
          <S.Square value={data.color}/>
          <S.Icon
            icon={iconList['edit']}/>
          <S.Icon
            icon={iconList['remove']}/>
        </S.ItemWrapper>
      );
    });
  }

  return (
    <S.ListWrapper>
      {show_list()}
    </S.ListWrapper>
  );
};

export default Detector_List;
