import React from "react";
import { status_legend, version } from "../../assets/constants";
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

  /**
   * Show general information about the charts and the leds in the
   * model page.
   * @returns legend information
   */
  function showLegend(): React.ReactElement {
    return (
      <S.LegendWrapper>
        <S.Title>
          Legend
        </S.Title>
        <br/>
        {
          status_legend.map((status: string, state: number) =>{
            return (
              <S.Row>
                <S.LedWrapper value={state}/>
                <S.Text>
                  {status}
                </S.Text>
              </S.Row>
            );
          })
        }
        <br/>
        NC: PV not connected.
        <br/><br/>
        <S.Title>
          Logarithmic Axis:
        </S.Title>
        <S.Text>
          Double click on the chart.
        </S.Text>
      </S.LegendWrapper>
    );
  }

  return (
    <S.FooterWrapper>
      {(props.value)?
        showLegend():""}
      <S.FooterText>
        For improvements ideas or further information, contact the groups:
        <br/><br/>
        <S.Contact>SwC ( swc@lnls.br )</S.Contact> or
        <S.Contact>RAD ( rad@cnpem.br )</S.Contact>
        <br/><br/>
        {version}
      </S.FooterText>
    </S.FooterWrapper>
  );
};

Footer.defaultProps = defaultProps;
export default Footer;
