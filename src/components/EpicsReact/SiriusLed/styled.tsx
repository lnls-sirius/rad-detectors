import styled from "styled-components";
import { LedStatus } from "../../../assets/interfaces/components";
import { DictStr } from "../../../assets/interfaces/patterns";
import { colors, led_shape } from "../../../assets/themes";

const LedWrapper = styled.div`
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
