import styled from "styled-components";
import { DictNum } from "../../assets/interfaces/patterns";
import { colors, led_shape } from "../../assets/themes";

const LedWrapper = styled.div`
  background: ${(props: DictNum) =>
    colors.led[props.value]};
  ${led_shape['gn']};
  border: outset 0.15em;
  padding: 0.2em;
  margin: 0.2em;
`

const LegendWrapper = styled.div`
  position: absolute;
  bottom: 0em;
  left: 0em;
  margin-bottom: 2em;
  margin-left: 1em;
`

const Title = styled.span`
  display: flex;
  heigth: 100%;
  font-weight: 900;
  align-items: center;
  justify-content: center;
`

const Text = styled.span`
  display: flex;
  heigth: 100%;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`

const FooterWrapper = styled.div`
`;

const FooterText = styled.div`
  background: ${colors.bg.secondary};
  text-align: center;
  font-size: 14px;
  padding-top: 1em;
  padding: 1em;
`

export {
  LedWrapper,
  LegendWrapper,
  FooterWrapper,
  Text,
  Title,
  FooterText,
  Row
}
