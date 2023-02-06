import React, { useEffect } from "react";
import { iconList } from "../../assets/icons";
import { Square } from "../../assets/themes";
import * as S from './styled';

const DetectorList: React.FC<any> = (props): React.ReactElement => {

  return (
    <S.ListWrapper>
      {
      Object.entries(props.pvs_data).map(([det_id, data]: any)=>{
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
              icon={iconList['remove']}
              onClick={()=>props.deleteHandler(det_id)}/>
          </S.ItemWrapper>
        );
      })
      }
    </S.ListWrapper>
  );
};

export default DetectorList;
