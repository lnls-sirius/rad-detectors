import React from "react";
import { iconList } from "../../assets/icons";
import { NavInterface } from "../../assets/interfaces/components";
import * as S from './styled';

/**
 * Shows the navigation buttons for the current page
 * @param props
 *  value - current page
 * @returns
 */
const defaultProps: NavInterface = {
  value: "model"
};
const Navigation: React.FC<NavInterface> = (props) => {

  return (
    <S.ControlWrapper>
      <S.Nav
        to={{
          pathname: (props.value=='model')?"/monitor":"/model"
        }}>
          <S.Icon icon={
            iconList[
              (props.value=='model')?"bar_chart":"model"]}/>
      </S.Nav>
      <S.Nav
        to={{
          pathname: (props.value=='rad')?"/monitor":"/rad"
        }}>
          <S.Icon
            icon={iconList[
              (props.value=='rad')?"bar_chart":"manager"]}/>
      </S.Nav>
    </S.ControlWrapper>
  );
};
Navigation.defaultProps = defaultProps;
export default Navigation;
