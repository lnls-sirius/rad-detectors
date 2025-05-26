import styled from "styled-components";
import { colors } from "../../assets/themes";

const Background = styled.div`
  background: ${colors.bg.primary};
  width: 100vw;
  height: 100vh;
`

const ChartWrapper = styled.div`
  margin: 0em;
  width: 100vw;
  height: 50vh;
  margin-left: 0vw;
`

const ButtonWrapper = styled.div`
  margin: 1em;
  width: 100vw;
  text-align: center;
`

export {
  Background,
  ChartWrapper,
  ButtonWrapper
}
