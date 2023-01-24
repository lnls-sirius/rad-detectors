import React from "react";
import { status_legend } from "../../assets/constants";
import { StateBool } from "../../assets/interfaces/patterns";
import * as S from './styled';

const Footer: React.FC<StateBool> = (props): React.ReactElement => {

  function showLegend(): React.ReactElement {
    return (
      <S.LegendWrapper>
        <S.Title>
          Logarithmic Axis:
        </S.Title>
        <S.Text>
          Click with the scroll button<br/>
          on the chart.
        </S.Text>
        <br/>
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
      </S.LegendWrapper>
    );
  }

  return (
    <S.FooterWrapper>
      {(props.value)?
        showLegend():""}
      <S.FooterText>
        For improvements ideas or further information, contact: <br/>
        Maintainer: Rafael Lyra<br/>
        Group: SwC<br/>
        Email: rafael.lyra@lnls.br
      </S.FooterText>
    </S.FooterWrapper>
  );
};

export default Footer;
