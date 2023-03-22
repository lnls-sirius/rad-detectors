import styled from "styled-components";
import { colors, fadeIn, properties } from "../../assets/themes";

const ModalContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 4;
`

const Clock = styled.div`
    background: ${colors.bg.primary};
    margin: 0.5em;
    padding: 0em 0.5em;
    text-align: center;
    border-radius: ${properties.border_radius.round}
`

const AlertItem = styled.div`
    background: ${(props: {type:string, value: boolean})=>
        colors.limits[props.type]}AA;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10vw;
    height: 5vh;
    margin: 0.5em;
    animation: ${(props: {type:string, value: boolean})=>
        props.value?fadeIn:''} 0.3s linear;
    border-radius: ${properties.border_radius.light};
    box-shadow:
        0.1em 0.1em 0.1em 0.1em ${colors.properties.shadow};
`

export {
    ModalContainer,
    AlertItem,
    Clock
}
