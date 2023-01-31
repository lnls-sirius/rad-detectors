import React from "react";
import { iconList } from "../../assets/icons";
import { DictStr } from "../../assets/interfaces/patterns";
import { Square } from "../../assets/themes";
import * as S from './styled';
//[string, DictStr]

const DetectorList: React.FC<any> = (props): React.ReactElement => {
  function show_list(): React.ReactElement[] {
    return Object.entries(props.pvs_data).map(([det_id, data]: any)=>{
      return (
        <S.ItemWrapper>
          <S.Text>{det_id}</S.Text>
          {data.probe.toUpperCase()}
          <Square value={data.color}/>
          <S.Icon
            icon={iconList['edit']}
            onClick={()=>{
              props.selDet(det_id);
              props.setModal(true);
            }}/>
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

export default DetectorList;
