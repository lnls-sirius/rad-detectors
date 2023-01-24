import React from "react";
import { iconList } from "../../assets/icons";
import { DictStr, StateStr } from "../../assets/interfaces/patterns";
import * as S from './styled';

const Controls: React.FC<StateStr> = (props) => {

  return (
    <S.ControlWrapper>
      <S.Navigation
        to={{
          pathname: (props.value=='monitor')?"/model":"/monitor"
        }}>
        <S.Icon icon={
          iconList[
            (props.value=='monitor')?"model":"bar_chart" as keyof DictStr]}/>
      </S.Navigation>
    </S.ControlWrapper>
  );
};
export default Controls;
