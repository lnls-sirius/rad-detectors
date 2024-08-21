import styled from "styled-components";
import { Coordinates } from "../../../assets/interfaces/patterns";
import { colors, fadeIn, properties } from "../../../assets/themes";

const HoverContainer = styled.table`
    position: absolute;
    ${(props: Coordinates)=>
        props.y>50?"bottom:1em;":"top:1em;"};
    display: inline-block;
    z-index: 2;
    visibility: hidden;
    border-radius: ${properties.border_radius.light};
    border: 0.1em solid ${colors.properties.border};
    border-spacing: 0em 0em;
    box-shadow:
        0.2em 0.2em 0.1em 0.1em ${colors.properties.shadow};
`


const TooltipWrapper = styled.div`
    &:hover ${HoverContainer} {
        background: ${colors.bg.modal};
        visibility: visible;
        animation: ${fadeIn} 0.3s linear;
    }
`


export {
    HoverContainer,
    TooltipWrapper
}
