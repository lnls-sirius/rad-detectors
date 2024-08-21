import styled, { css } from "styled-components";
import { colors, fadeIn } from "../../../assets/themes";

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
    margin-top: 0.2em;
    text-align: center;
    padding-left: 0.5em;
`

const InfoCell = styled.td`
    ${cellBase}
    font-style: oblique;
`


const InfoValue = styled.td`
    ${cellBase}
    padding-right: 0.5em;
`

const InfoValueHigh = styled.td`
    ${cellBase}
    font-weight: bold;
    min-width: 7em;
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
