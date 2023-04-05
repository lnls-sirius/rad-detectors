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
  align-items: center;
  justify-content: space-evenly;
  padding-left: 1vw;
  height: 5%;
  width: 100vw;
  background: ${colors.bg.chart};
`

export {
  ChartWrapper,
  LegendWrapper
}
