import React from "react";
import InfoBase from "../InfoBase";
import { SimpleInfoInterface } from "../../../assets/interfaces/components";
import * as S from './styled';
/**
 * Show the simplified information on hover led.
 * @param props
 *  pvs_data - RAD Detector's configuration data.
 *  children - Detector's led.
 *  name - name of the detector.
 *  modal - state of the hover modal component.
 *  x - position x of the detector's led on the screen.
 *  y - position y of the detector's led on the screen.
 */

const defaultProps: SimpleInfoInterface = {
  pvs_data: {},
  children: <div/>,
  name: "",
  modal: false,
  x: 0,
  y: 0
}

const SimpleInfo: React.FC<SimpleInfoInterface> = (props) => {
  return (
    <S.TooltipWrapper>
      {props.children}
      <S.HoverContainer
          x={props.x} y={props.y}>
        <InfoBase
          name={props.name}
          modal={props.modal}
          pvs_data={props.pvs_data}/>
      </S.HoverContainer>
    </S.TooltipWrapper>
  );
};

SimpleInfo.defaultProps = defaultProps;
export default SimpleInfo;
