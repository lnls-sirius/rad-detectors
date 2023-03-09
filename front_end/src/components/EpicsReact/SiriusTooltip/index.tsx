import React, { useState } from "react";
import { PvTooltipInterface } from "../assets/interfaces";
import * as S from './styled';

/**
 * Tooltip to verify the PV being displayed.
 * @param props
 *  children - Component that is calling the tooltip
 *  text - Text shown in the tooltip
 * @param state - Visibility of the tooltip.
*/
const SiriusTooltip: React.FC<PvTooltipInterface> = (props) => {
  const [state, setState] = useState<boolean>(false);

  /**
   *  Toggle the tooltip with the scroll click.
   * @param event - Mouse click event
   * @param to_state - Future state
   */
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
