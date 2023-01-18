import React from "react";
import { iconList } from "../../assets/icons";
import { DictString, StateStr } from "../../assets/interfaces";
import * as S from './styled';

const Controls: React.FC<StateStr> = (props) => {
  return (
    <S.Navigation
      to={{
        pathname: (props.value=='monitor')?"/model":"/monitor"
      }}>
      <S.Icon icon={
        iconList[
          (props.value=='monitor')?"model":"bar_chart" as keyof DictString]}/>
    </S.Navigation>
  );
};
export default Controls;
