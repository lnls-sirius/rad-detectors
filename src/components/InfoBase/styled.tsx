import styled from "styled-components";
import { colors, fadeIn, properties } from "../../assets/themes";

const InfoContainer = styled.table`
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
    text-align: center;
`

const TooltipWrapper = styled.div`
    &:hover ${InfoContainer} {
        background: ${colors.bg.secondary};
        visibility: visible;
        animation: ${fadeIn} 0.3s linear;
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
