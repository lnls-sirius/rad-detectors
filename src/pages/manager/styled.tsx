import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AnimButton, CenterPosition, CloseIcon, colors, ModalContent, ModalWrapper, properties } from "../../assets/themes";

const Background = styled.div`
    background: ${colors.bg.primary};
    width: 100vw;
    height: 100vh;
`

const SecLayer = styled.div`
    ${ModalWrapper};
`

const Close = styled(FontAwesomeIcon)`
    ${CloseIcon};
`

const Nav = styled(Link)`
    color: ${colors.properties.border};
`

const Content = styled.div`
    background: ${colors.bg.chart};
    padding: 3em 2em 1em 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${CenterPosition};
    ${ModalContent};
`

const InputWrapper = styled.div`
    width: 100%;
    margin: 0.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Login = styled.button`
    width: 20%;
    height: 2em;
    margin-top: 2em;
    background: ${colors.bg.primary};
    border-radius: ${properties.border_radius.light};
    ${AnimButton};
`

export {
    Background,
    SecLayer,
    Close,
    Nav,
    Content,
    InputWrapper,
    Login
}
