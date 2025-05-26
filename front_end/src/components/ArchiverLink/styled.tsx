import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimButton, colors, properties } from "../../assets/themes";

const ArchViewer = styled.a`
  width: 5em;
  height: 5em;
  font-size: 20px;
  background: ${colors.bg.secondary};
  color: ${colors.properties.border};
  text-align: center;
  text-decoration: none;
  padding: 0.2em;
  margin: 0em 3em;
  border-radius: ${properties.border_radius.light};
  ${AnimButton}
`

const ChartIcon = styled(FontAwesomeIcon)`
`

export {
    ArchViewer, 
    ChartIcon
}