import React from "react";
import { SimpleInfoInterface } from "../../assets/interfaces/components";
import * as S from './styled';
import InfoBase from "../InfoBase";
import { Coordinates } from "../../assets/interfaces/patterns";

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
