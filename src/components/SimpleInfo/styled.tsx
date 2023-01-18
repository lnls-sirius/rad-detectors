import styled from "styled-components";
import { Coordinates } from "../../assets/interfaces";
import { colors, fadeIn, properties } from "../../assets/themes";

const HoverContainer = styled.table`
    position: absolute;
    ${(props: Coordinates)=>
        props.y>75?"bottom:1em;":"top:1em;"};
    display: inline-block;
    z-index: 2;
    visibility: hidden;
    padding: 0.5em;
    border-radius: ${properties.border_radius.light};
    border: 0.1em solid ${colors.border};
    border-spacing: 0em 0em;
    box-shadow:
        0.1em 0.1em 0.1em 0.1em ${colors.shadow};
`


const TooltipWrapper = styled.div`
    &:hover ${HoverContainer} {
        background: ${colors.bg.secondary};
        visibility: visible;
        animation: ${fadeIn} 0.3s linear;
    }
`


export {
    HoverContainer,
    TooltipWrapper
}
