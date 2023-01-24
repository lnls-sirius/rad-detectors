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

export {
    Background,
    ChartWrapper
}
