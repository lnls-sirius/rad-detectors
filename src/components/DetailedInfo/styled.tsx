import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimButton, colors, fadeIn, properties } from "../../assets/themes";
import { StateBool } from "../../assets/interfaces/patterns";

const ModalContainer = styled.div`
    background: ${colors.properties.shadow};
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    animation: ${(props: StateBool)=>
        props.value?fadeIn:''} 0.3s linear;

`

const Content = styled.div`
    background: ${colors.bg.secondary};
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: ${properties.border_radius.light};
    box-shadow:
        0.1em 0.1em 0.1em 0.1em ${colors.properties.shadow};
`

const Body = styled.div`
    padding: 3em 1em 1em 1em;
    margin: 0.5em;
`;

const Close = styled(FontAwesomeIcon)`
    position: fixed;
    top: 0.75em;
    right: 1em;
    width: 1.5em;
    height: 1.5em;
    padding: 0.2em;
    border-radius: ${properties.border_radius.light};
    ${AnimButton}
`

const InfoContainer = styled.table`
    position: absolute;
    z-index: 2;
    visibility: hidden;
    padding: 0.5em;
    border-radius: ${properties.border_radius.light};
    border: 0.1em solid ${colors.properties.border};
    border-spacing: 0em 0em;
    box-shadow:
        0.1em 0.1em 0.1em 0.1em ${colors.properties.shadow};
`

const InfoRow = styled.tr`
    &:hover{
        background: ${colors.bg.secondary_dark};
    }
`

const InfoCell = styled.td`
    border-bottom: 0.1em solid ${colors.properties.border};
    border-top: 0.1em solid ${colors.properties.border};
`

const DosageWrapper = styled.table`
    text-align: center;
`

const ChartWrapper = styled.div`
  margin-top: 0.1em;
  min-width: 40em;
  width: 100%;
  height: 20vh;
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
    ModalContainer,
    Content,
    Body,
    Close,
    InfoContainer,
    InfoRow,
    InfoCell,
    DosageWrapper,
    ChartWrapper,
    ArchViewer,
    ChartIcon
}
