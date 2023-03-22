import { DictStr } from "./interfaces"

// Component colors
const colors: {[key: string]: DictStr} = {
    led: {
        '0': 'radial-gradient(#1bff1d, #14a200)',
        '1': 'radial-gradient(#f8ff1b, #a29800)',
        '2': 'radial-gradient(#ff1b1b, #a20000)',
        '3': 'radial-gradient(#dedede, #9e9e9e)'
    }
}

// Main led shapes
const led_shape: DictStr = {
    circle: `
        border-radius: 2em;`,
    squ_circ: `
        border-radius: 0.5em;`,
    square: ``
}

export {
    colors,
    led_shape
}
