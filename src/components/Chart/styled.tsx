import styled from "styled-components";
import { colors, properties } from "../../assets/themes";

const Chart = styled.canvas`
  background: ${colors.bg.white};
  width: 100%;
  border-radius: ${properties.border_radius.light};
`;

const ChartWrapper = styled.div`
  margin-top: 1em;
  width: 100%;
`

export {
  Chart,
  ChartWrapper
}
