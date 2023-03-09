import styled from "styled-components";
import { colors, properties } from "../../assets/themes";

const ChartWrapper = styled.div`
  width: 100%;
  height: 95%;
  background: ${colors.bg.chart};
  border-radius: ${properties.border_radius.light};
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
  ChartWrapper,
  LegendWrapper
}
