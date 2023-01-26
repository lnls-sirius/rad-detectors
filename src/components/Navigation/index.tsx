import React from "react";
import { iconList } from "../../assets/icons";
import { NavInterface } from "../../assets/interfaces/components";
import { DictStr } from "../../assets/interfaces/patterns";
import Alertlist from "../Alert";
import * as S from './styled';

const Navigation: React.FC<NavInterface> = (props) => {

  return (
    <S.ControlWrapper>
      <Alertlist
        popup={props.popup}/>
      <S.Nav
        to={{
          pathname: (props.value=='monitor')?"/model":"/monitor"
        }}>
        <S.Icon icon={
          iconList[
            (props.value=='monitor')?"model":"bar_chart" as keyof DictStr]}/>
      </S.Nav>
    </S.ControlWrapper>
  );
};
export default Navigation;
