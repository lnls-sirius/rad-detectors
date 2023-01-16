import styled from "styled-components";
import { colors } from "../../assets/themes";

const InfoContainer = styled.table`
    position: absolute;
    z-index: 2;
    visibility: hidden;
    padding: 0.5em;
    border-radius: 0.5em;
    border: 0.1em solid ${colors.border};
    border-spacing: 0em 0em;

`

const InfoRow = styled.tr`
    &:hover{
        background: ${colors.bg.secondary_dark};
    }
`

const InfoCell = styled.td`
    border-bottom: 0.1em solid ${colors.border};
    border-top: 0.1em solid ${colors.border};
`

const TooltipWrapper = styled.div`
    &:hover ${InfoContainer} {
        background: ${colors.bg.secondary};
        visibility: visible;
    }
`

const DosageWrapper = styled.table`
    text-align: center;
`

export {
    InfoContainer,
    InfoRow,
    InfoCell,
    TooltipWrapper,
    DosageWrapper
}
