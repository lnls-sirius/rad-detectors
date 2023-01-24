import styled from "styled-components";
import { colors, properties } from "../../../assets/themes";

const Chart = styled.canvas`
  background: ${colors.bg.chart};
  width: 100%;
  height: 100%;
  border-radius: ${properties.border_radius.light};
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
`


export {
  Chart,
  ChartWrapper
}
