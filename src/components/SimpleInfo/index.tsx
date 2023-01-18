import React from "react";
import { Coordinates, SimpleInfoInterface } from "../../assets/interfaces";
import * as S from './styled';
import InfoBase from "../InfoBase";

const SimpleInfo: React.FC<SimpleInfoInterface&Coordinates> = (props) => {
  return (
    <S.TooltipWrapper>
      {props.children}
      <S.HoverContainer
          x={props.x} y={props.y}>
        <InfoBase
            name={props.name}
            modal={props.modal}>
        </InfoBase>
      </S.HoverContainer>
    </S.TooltipWrapper>
  );
};
export default SimpleInfo;
