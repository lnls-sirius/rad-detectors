import { css, keyframes } from "styled-components";
import { DictStr } from "./interfaces/patterns";

const colors: any = {
    led: [
        'radial-gradient(#1bff1d, #14a200)',
        'radial-gradient(#f8ff1b, #a29800)',
        'radial-gradient(#ff1b1b, #a20000)',
        'radial-gradient(#dedede, #9e9e9e)'
    ],
    limits: {
        alert: '#f8ff1b',
        alarm: '#ff1b1b',
        reference: '#71797e'
    },
    bg: {
        primary: '#ffffff',
        secondary_dark: '#898989',
        secondary: '#cccccc',
        chart: '#eeeeee'
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
    border:'#000000',
    shadow: '#242424D0'
}

const properties = {
    "border_radius": {
        light: "0.5em",
        round: "2em"
    }
}

const led_shape: DictStr = {
    "circle": `
        width: 1.5vh;
        height: 1.5vh;
        border-radius: ${properties.border_radius.round};`,
    "rectangle": `
        width: 1.5vh;
        height: 0.5vh;`,
    "square": `
        width: 1vh;
        height: 1vh;`
}

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const AnimButton = css`
    transition: 0.2s;
    &:hover{
        background: ${colors.btn.hover};
        transform: translateY(-.2rem);
    }
    &:active{
        background: ${colors.btn.active};
    }
`

export {
    colors,
    properties,
    led_shape,
    fadeIn,
    AnimButton
}
