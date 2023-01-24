import styled from "styled-components";
import { StateBool } from "../../../assets/interfaces/patterns";
import { properties } from "../../../assets/themes";

const TooltipText = styled.div`
    position: absolute;
    right: 1em;
    z-index: 10;
    background: #FFFFFF;
    visibility: ${(props: StateBool)=>
        props.value?"visible":"hidden"};
    min-width: 5em;
    text-align: center;
    padding: 0em 0.25em;
    border-radius: ${properties.border_radius.light};
`

export {
    TooltipText
}
