import React from "react";
import Legend from "../Legend";
import { version } from "../../assets/constants";
import { StateBool } from "../../assets/interfaces/patterns";
import * as S from './styled';

/**
 * Show the footer information and the legend information.
 * @param props
 *  - value: state of the legend component
 * @returns
 */
const defaultProps: StateBool = {
  value: true
}

const Footer: React.FC<StateBool> = (props): React.ReactElement => {

  return (
    <S.FooterWrapper>
      <Legend value={props.value}/>
      <S.ContactWrapper>
        <S.FooterText>
          For improvements ideas or further information, contact the groups:
          <br/><br/>
          <S.Contact>SwC ( swc@lnls.br )</S.Contact> or
          <S.Contact>RAD ( rad@cnpem.br )</S.Contact>
          <br/><br/>
          {version}
        </S.FooterText>
      </S.ContactWrapper>
    </S.FooterWrapper>
  );
};

Footer.defaultProps = defaultProps;
export default Footer;
