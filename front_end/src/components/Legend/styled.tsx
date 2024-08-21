import styled from "styled-components";
import { colors, properties } from "../../assets/themes";
import { DictNum } from "../../assets/interfaces/patterns";

const LedWrapper = styled.div`
  background: ${(props: DictNum) =>
    colors.led[props.value]};
  border-radius: ${properties.border_radius.round};
  border: outset 0.15em;
  padding: 0.4em;
  margin: 0.2em 0.5em;
`

const LedsWrapper = styled.div`
  position: absolute;
  bottom: 0em;
  left: 0em;
  margin-bottom: 2em;
  margin-left: 1em;
  background: ${colors.bg.secondary};
  border: 2px solid ${colors.bg.secondary_dark};
  border-radius: 1em;
  padding-bottom: 0.5em;
`

const Title = styled.span`
  display: flex;
  heigth: 100%;
  font-weight: 900;
  font-size: 13px;
  align-items: center;
  justify-content: center;
  background: ${colors.bg.secondary_dark}77;
  border-radius: 1em 1em 0em 0em;
  margin-bottom: 0.5em;
  padding: 0em 1em;
  text-align: center;
`

const Text = styled.div`
  display: flex;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 0em 0.5em;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`

const LegendWrapper = styled.footer`
  display: flex;
  flex-direction: row;
`;

const LegendChart = styled.div`
  background: ${colors.bg.secondary_dark};
  display: grid;
  grid-template-columns: repeat(5, 20%);
  width: 100%;
  height: 100%;
  padding: 1em 0em;
`;

const ShortcutWrapper = styled.div`
  background: ${colors.bg.chart}99;
  display: flex;
  flex-direction: column;
  height: 80%;
  padding-bottom: 0.75em;
  margin: 0em 1.5em;
  border-radius: 1em;
`;

const TitleWrapper = styled.div`
  background: ${colors.bg.chart};
  display: flex;
  font-weight: 900;
  font-size: 20px;
  flex-direction: column;
  align-items: center;
  height: 40%;
  margin: 10% 10%;
  padding: 0.1em 0em;
  border-radius: 0.3em;
`;

export {
  LedWrapper,
  LedsWrapper,
  LegendWrapper,
  Text,
  Title,
  Row,
  LegendChart,
  ShortcutWrapper,
  TitleWrapper
}
