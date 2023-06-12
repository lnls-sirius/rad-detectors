import styled from "styled-components";
import { AnimButton, colors, properties } from "../../assets/themes";

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

const Button = styled.button`
  position: relative;
  bottom: 2em;
  z-index: 1;
  visibility: visible;
  min-width: 2em;
  text-align: center;
  margin: 0.25em 0.5em;
  ${AnimButton};
`


export {
  Button,
  Chart,
  ChartWrapper
}
