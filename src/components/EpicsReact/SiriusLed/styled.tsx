import styled from "styled-components";
import { DictString, LedStatus } from "../../../assets/interfaces";
import { colors, led_shape } from "../../../assets/themes";

const LedWrapper = styled.div`
    background: ${(props: LedStatus) =>
        colors.led[props.state]};
    ${(props: LedStatus) =>
        led_shape[props.shape as keyof DictString]};
    border: outset 0.15em;
    padding: 0.2em;
`

export {
    LedWrapper
}
