import styled, { css } from "styled-components";
import { colors, fadeIn} from "../../../assets/themes";

const InfoContainer = styled.table`
    border-spacing: 0em 0em;
    margin-bottom: 1em;
    width:100%;
`

const InfoRow = styled.tr`
    &:hover{
        background: ${colors.bg.secondary_dark};
    }
`

const cellBase = css`
    border-bottom: 0.1em solid ${colors.properties.border};
    border-top: 0.1em solid ${colors.properties.border};
    text-align: center;
`

const InfoCell = styled.td`
    ${cellBase}
    font-style: oblique;
`


const InfoValue = styled.td`
    ${cellBase}
    padding-left: 0.5em;
`

const InfoValueHigh = styled.td`
    ${cellBase}
    font-weight: bold;
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
    InfoValueHigh,
    TooltipWrapper,
    DosageWrapper
}
