import styled, { css, Keyframes, keyframes } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DDictStr, DictStr, StateStr } from "./interfaces/patterns";

// Colors themes
const colors: DDictStr = {
    led: {
        '0': 'radial-gradient(#1bff1d, #14a200)',
        '1': 'radial-gradient(#f8ff1b, #a29800)',
        '2': 'radial-gradient(#ff1b1b, #a20000)',
        '3': 'radial-gradient(#dedede, #9e9e9e)'
    },
    limits: {
        alert: '#f8ff1b',
        alarm: '#ff1b1b',
        reference: '#71797e',
        normal: '#3eaf3b'
    },
    bg: {
        primary: '#ffffff',
        secondary_dark: '#898989',
        secondary: '#cccccc',
        chart: '#eeeeee',
        modal: 'linear-gradient(to top right, #a5a5a5, #d0d0d0)',
        alarm: '#ff8a8a',
        legend: 'linear-gradient(to bottom, #aaaaaa, #c3c3c3)'
    },
    btn: {
        hover: '#919191',
        active: '#616161'
    },
    axis: {
        gamma: '#09bf00',
        neutrons: '#4700b3',
        integrated_dose: '#004cb3'
    },
    properties: {
        border:'#000000',
        shadow: '#242424D0'
    }
}

// General properties
const properties: DDictStr = {
    border_radius: {
        light: "0.5em",
        round: "2em"
    }
}

// Fade in animation
const fadeIn: Keyframes = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const AnimButton: any = css`
    transition: 0.2s;
    &:hover{
        background: ${colors.btn.hover};
        transform: translateY(-.2rem);
        box-shadow: 1px 3px 3px ${colors.properties.border};
    }
    &:active{
        background: ${colors.btn.active};
    }
`

// Modal Background Style
const ModalWrapper: any = css`
    background: ${colors.properties.shadow};
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
`

// Modal Content Style
const ModalContent: any = css`
    position: absolute;
    z-index: 1;
    border-radius: ${properties.border_radius.light};
    border: 0.1em solid ${colors.properties.border};
    border-spacing: 0em 0em;
    box-shadow:
        0.1em 0.1em 0.1em 0.1em ${colors.properties.shadow};
`

// Icon Style
const Icon = styled(FontAwesomeIcon)`
  width: 1.5em;
  height: 1.5em;
  padding: 0.2em;
  border-radius: ${
    properties.border_radius.light};
  ${AnimButton}
`

// Close Icon Style
const CloseIcon: any = styled(Icon)`
    position: fixed;
    top: 0.75em;
    right: 1em;
    ${AnimButton}
`

// Center Style
const CenterPosition: any = css`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`

// Square Style
const Square = styled.div`
  width: 90%;
  height: 90%;
  min-width: 1em;
  max-width: 1.75em;
  margin: 0em 0.5em;
  border-radius: ${
    properties.border_radius.light};
  background-color: ${
    (props: StateStr) => props.value}
`

export {
    colors,
    properties,
    fadeIn,
    AnimButton,
    ModalWrapper,
    Icon,
    CloseIcon,
    ModalContent,
    CenterPosition,
    Square
}
