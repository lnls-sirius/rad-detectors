import styled from "styled-components";
import { AnimButton, CenterPosition, colors, fadeIn,
    ModalContent, ModalWrapper, properties } from "../../assets/themes";
import { StateBool } from "../../assets/interfaces/patterns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalContainer = styled.div`
    ${ModalWrapper};
    animation: ${(props: StateBool)=>
        props.value?fadeIn:''} 0.3s linear;
`

const Content = styled.div`
    background: ${colors.bg.secondary};
    ${CenterPosition};
    border-radius: ${properties.border_radius.light};
    box-shadow:
        0.1em 0.1em 0.1em 0.1em ${colors.properties.shadow};
`

const Body = styled.div`
    padding: 3em 1em 1em 1em;
    margin: 0.5em;
`;

const InfoContainer = styled.table`
    ${ModalContent};
    padding: 0.5em;
    visibility: hidden;
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
  color: ${colors.properties.border};
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
    InfoContainer,
    InfoRow,
    InfoCell,
    DosageWrapper,
    ChartWrapper,
    ArchViewer,
    ChartIcon
}
