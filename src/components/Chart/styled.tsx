import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimButton, colors, properties } from "../../assets/themes";

const Chart = styled.canvas`
  background: ${colors.bg.white};
  width: 100%;
  border-radius: ${properties.border_radius.light};
`;

const ChartWrapper = styled.div`
  margin-top: 1em;
  min-width: 40em;
  width: 100%;
`

const ArchViewer = styled.a`
  position: fixed;
  top: 0.5em;
  left: 2em;
  color: #000000;
  text-decoration: none;
`

const ChartIcon = styled(FontAwesomeIcon)`
  width: 2em;
  height: 2em;
  padding: 0.2em;
  border-radius: ${properties.border_radius.light};
  ${AnimButton}
`

export {
  Chart,
  ChartWrapper,
  ArchViewer,
  ChartIcon
}
