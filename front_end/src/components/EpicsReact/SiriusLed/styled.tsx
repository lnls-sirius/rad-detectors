import styled from "styled-components";
import { colors, led_shape } from "../../../assets/themes";
import { LedStatus } from "../../../assets/interfaces/components";
import { DictStr } from "../../../assets/interfaces/patterns";

const LedWrapper = styled.div`
    width: 1vh;
    height: 1vh;
    background: ${(props: LedStatus) =>
        colors.led[props.state]};
    ${(props: LedStatus) =>
        led_shape[props.shape as keyof DictStr]};
    border: outset 0.15em;
    padding: 0.2em;
`

export {
    LedWrapper
}
