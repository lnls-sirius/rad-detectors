import styled from "styled-components";
import { Link } from "react-router-dom";
import { AnimButton, CenterPosition, colors, ModalContent, ModalWrapper, properties } from "../../../assets/themes";

const SecLayer = styled.div`
    ${ModalWrapper};
`

const Nav = styled(Link)`
    color: ${colors.properties.border};
`

const Content = styled.div`
    background: ${colors.bg.modal};
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
    background: ${colors.btn.hover};
    border: 1px solid #000000;
    border-radius: ${properties.border_radius.light};
    ${AnimButton};
`

const DetectorsWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

export {
    SecLayer,
    Nav,
    Content,
    InputWrapper,
    Login,
    DetectorsWrapper
}
