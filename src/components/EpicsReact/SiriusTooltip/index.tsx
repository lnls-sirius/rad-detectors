import React, { useState } from "react";
import { PvTooltipInterface } from "../../../assets/interfaces";
import * as S from './styled';

const SiriusTooltip: React.FC<PvTooltipInterface> = (props) => {
  const [state, setState] = useState<boolean>(false);

  const mouseHandler = ( event: React.MouseEvent, to_state: boolean) => {
    if( event.button === 1 ) {
      setState(to_state);
    }
  }

  return (
    <div
        onMouseDown={(evt)=>mouseHandler(evt, true)}
        onMouseUp={(evt)=>mouseHandler(evt, false)}>
      {props.children}
      <S.TooltipText
        value={state}>
          {props.text}
      </S.TooltipText>
    </div>
  )
};

export default SiriusTooltip;
