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
        secondary: '#7ffff9'
    },
    border:'#000000'
}

const led_shape: DictString = {
    "ha": `
        width: 1.5vh;
        height: 1.5vh;
        border-radius: 2em;`,
    "ro": `
        width: 1vh;
        height: 1vh;
        border-radius: 2em;`,
    "bo": `
        width: 1.5vh;
        height: 0.5vh;`,
    "he": `
        width: 1vh;
        height: 1vh;`
}

export {
    colors,
    led_shape
}
