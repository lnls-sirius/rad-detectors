import styled from "styled-components";
import { StateBool } from "../assets/interfaces";

const TooltipText = styled.div`
    position: absolute;
    z-index: 10;
    background: #eeeeee;
    visibility: ${(props: StateBool)=>
        props.value?"visible":"hidden"};
    min-width: 5em;
    text-align: center;
    padding: 0em 0.25em;
    border-radius: 0.5em;
`

export {
    TooltipText
}
