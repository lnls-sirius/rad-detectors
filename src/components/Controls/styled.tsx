import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from "styled-components";
import { AnimButton, properties } from "../../assets/themes";

const Navigation = styled(Link)`
`;

const Icon = styled(FontAwesomeIcon)`
    position: fixed;
    top: 0.75em;
    left: 1em;
    width: 2.5em;
    height: 2.5em;
    padding: 0.2em;
    color: #000000;
    border-radius: ${properties.border_radius.light};
    ${AnimButton}
`

export {
    Navigation,
    Icon
}
