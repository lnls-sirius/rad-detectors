import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from "styled-components";
import { AnimButton, properties } from "../../assets/themes";

const Navigation = styled(Link)`
`;

const Icon = styled(FontAwesomeIcon)`
    width: 2.5em;
    height: 2.5em;
    padding: 0.2em;
    color: #000000;
    border-radius: ${properties.border_radius.light};
    ${AnimButton}
`

const ControlWrapper = styled.div`
    position: fixed;
    top: 1.5em;
    right: 1em;
`

export {
    ControlWrapper,
    Navigation,
    Icon
}
