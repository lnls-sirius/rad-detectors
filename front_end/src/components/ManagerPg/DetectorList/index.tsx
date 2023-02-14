import React from "react";
import { iconList } from "../../../assets/icons";
import { Icon, Square } from "../../../assets/themes";
import { DetListProps } from "../../../assets/interfaces/components";
import * as S from './styled';

/**
 * Creates an editable list of detectors
 * @param props
 *  - pvs_data - RAD Detectors configuration data
 *  - selDet - Select detector function
 *  - setModal - Set modal state function
 *  - deleteHandler - Delete detector function
 */

const DetectorList: React.FC<DetListProps> = (props): React.ReactElement => {

  return (
    <S.ListWrapper>
      {
      Object.entries(props.pvs_data).map(([det_id, data]: any)=>{
        return (
          <S.ItemWrapper>
            <S.Text>{det_id}</S.Text>
            {data.probe.toUpperCase()}
            <Square value={data.color}/>
            <Icon
              icon={iconList['edit']}
              onClick={()=>{
                props.selDet(det_id);
                props.setModal(true);
              }}/>
            <Icon
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
