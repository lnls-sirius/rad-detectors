import styled from "styled-components";
import { DictNum } from "../../assets/interfaces/patterns";
import { colors, led_shape, properties } from "../../assets/themes";

const LedWrapper = styled.div`
  background: ${(props: DictNum) =>
    colors.led[props.value]};
  ${led_shape['circle']};
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

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
`;

const FooterText = styled.div`
  background: ${colors.bg.secondary};
  text-align: center;
  width: 100%;
  font-size: 14px;
  margin-top: 2em;
  padding: 2em 0em;
`

const Contact = styled.span`
  background: ${colors.bg.secondary_dark};
  margin: 1em 2em;
  padding: 0.5em 2em;
  font-style: oblique;
  font-weight: 900;
  border-radius: ${
    properties.border_radius.light};
`

export {
  LedWrapper,
  LegendWrapper,
  FooterWrapper,
  Text,
  Title,
  Row,
  FooterText,
  Contact
}
