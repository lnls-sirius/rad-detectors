import styled from "styled-components";
import { colors, properties } from "../../assets/themes";

const Chart = styled.canvas`
  width: 100%;
  height: 100%;
  border-radius: ${properties.border_radius.light};
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 95%;
  background: ${colors.bg.chart};
`

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 5vw;
  height: 5%;
  width: 100%;
  background: ${colors.bg.chart};
`

export {
  Chart,
  ChartWrapper,
  LegendWrapper
}
