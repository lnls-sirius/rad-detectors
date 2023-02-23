import styled from "styled-components";
import { colors, properties } from "../../../assets/themes";

const Chart = styled.canvas`
  width: 100%;
  height: 100%;
  border-radius: ${properties.border_radius.light};
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.bg.chart};
`

export {
  Chart,
  ChartWrapper
}
