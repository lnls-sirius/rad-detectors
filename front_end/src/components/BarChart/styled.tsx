import styled from "styled-components";
import { colors, properties } from "../../assets/themes";

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.bg.chart};
  border-radius: ${properties.border_radius.light};
`

export {
  ChartWrapper
}
