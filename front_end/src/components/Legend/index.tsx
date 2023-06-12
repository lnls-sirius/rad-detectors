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

const Legend: React.FC<StateBool> = (props): React.ReactElement => {

  /**
   * Show general information about the charts and the leds in the
   * model page.
   * @returns legend information
   */
  function showLedLegend(): React.ReactElement {
    return (
      <S.LedsWrapper>
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
        <S.Text>
          NC: PV not connected.
        </S.Text>
      </S.LedsWrapper>
    );
  }

  function showChartLegend(): React.ReactElement {
    return (
      <S.LegendChart>
        <S.TitleWrapper>
          <S.Text>
            Shortcuts Legend
          </S.Text>
        </S.TitleWrapper>
        <S.ShortcutWrapper>
          <S.Title>
            Logarithmic Axis
          </S.Title>
          <S.Text>
            Double click on the chart
          </S.Text>
        </S.ShortcutWrapper>
        <S.ShortcutWrapper>
          <S.Title>
            SHIFT + SCROLL MOUSE
          </S.Title>
          <S.Text>
            Zoom in or out the X and Y axis.
          </S.Text>
        </S.ShortcutWrapper>
        <S.ShortcutWrapper>
          <S.Title>
            CTRL + CLICK AND DRAG MOUSE
          </S.Title>
          <S.Text>
            Zoom in the selected area.
          </S.Text>
        </S.ShortcutWrapper>
        <S.ShortcutWrapper>
          <S.Title>
            SHIFT + CLICK AND DRAG MOUSE
          </S.Title>
          <S.Text>
            Move the position of the data
            in the viewport.
          </S.Text>
        </S.ShortcutWrapper>
      </S.LegendChart>
    );
  }

  return (
    <S.LegendWrapper>
      {(props.value)?
        showLedLegend():""}
      {showChartLegend()}
    </S.LegendWrapper>
  );
};

Legend.defaultProps = defaultProps;
export default Legend;
