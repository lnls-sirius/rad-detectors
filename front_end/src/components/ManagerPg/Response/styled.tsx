import styled from "styled-components";
import { StateBool } from "../../../assets/interfaces/patterns";
import { colors, fadeIn, properties } from "../../../assets/themes";

const ModalContainer = styled.div`
    position: fixed;
    display: flex;
    left: 0;
    top: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
    z-index: 4;
`

const AlertItem = styled.div`
    background-color: ${colors.bg.alarm};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50vw;
    height: 5vh;
    margin: 0.5em;
    animation: ${(props: StateBool)=>
        props.value?fadeIn:''} 0.3s linear;
    border-radius: ${properties.border_radius.light};
    box-shadow:
        0.1em 0.1em 0.1em 0.1em ${colors.properties.shadow};
`

export {
    ModalContainer,
    AlertItem
}
