import { keyframes } from "styled-components";
import { DictString } from "./interfaces";

const colors = {
    led: [
        'radial-gradient(#1bff1d, #14a200)',
        'radial-gradient(#f8ff1b, #a29800)',
        'radial-gradient(#ff1b1b, #a20000)',
        'radial-gradient(#dedede, #9e9e9e)'
    ],
    bg: {
        primary: 'linear-gradient(to left, #55ff7b, #89ffd4, #55ff7b);',
        secondary_dark: '#00bfb7',
        secondary: '#7ffff9',
        white: '#ffffff'
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

const led_shape: DictString = {
    "ha": `
        width: 1.5vh;
        height: 1.5vh;
        border-radius: ${properties.border_radius.round};`,
    "ro": `
        width: 1vh;
        height: 1vh;
        border-radius: ${properties.border_radius.round};`,
    "bo": `
        width: 1.5vh;
        height: 0.5vh;`,
    "he": `
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


export {
    colors,
    properties,
    led_shape,
    fadeIn
}
