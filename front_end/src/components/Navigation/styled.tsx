import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimButton, colors, properties } from "../../assets/themes";

const Nav = styled(Link)`
`;

const Icon = styled(FontAwesomeIcon)`
    width: 2.5em;
    height: 1.5em;
    padding: 0.2em;
    color: ${colors.properties.border};
    border-radius: ${properties.border_radius.light};
    ${AnimButton}
`

const ControlWrapper = styled.nav`
    position: absolute;
    top: 0.25em;
    right: 3em;
`

export {
    ControlWrapper,
    Nav,
    Icon
}
