import styled, { css } from "styled-components";
import { colors, fadeIn} from "../../assets/themes";

const InfoContainer = styled.table`
    border-spacing: 0em 0em;
    width:100%;
`

const InfoRow = styled.tr`
    &:hover{
        background: ${colors.bg.secondary_dark};
    }
`

const cellBase = css`
    border-bottom: 0.1em solid ${colors.border};
    border-top: 0.1em solid ${colors.border};
    text-align: center;
`

const InfoCell = styled.td`
    ${cellBase}
    font-weight: 900;
    padding-left: 1.5em;
`


const InfoValue = styled.td`
    ${cellBase}
    padding-right: 1.5em;
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
    InfoValue,
    TooltipWrapper,
    DosageWrapper
}
