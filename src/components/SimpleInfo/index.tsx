import React from "react";
import { SimpleInfoInterface } from "../../assets/interfaces";
import * as S from './styled';
import InfoBase from "../InfoBase";

const SimpleInfo: React.FC<SimpleInfoInterface> = (props) => {

  return (
    <S.TooltipWrapper>
      {props.children}
      <S.HoverContainer>
        <InfoBase
            name={props.name}
            modal={props.modal}>
        </InfoBase>
      </S.HoverContainer>
    </S.TooltipWrapper>
  );
};
export default SimpleInfo;
