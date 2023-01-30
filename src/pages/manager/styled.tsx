import styled from "styled-components";
import { colors } from "../../assets/themes";

const Background = styled.div`
    background: ${colors.bg.primary};
    width: 100vw;
    height: 100vh;
`

const Title = styled.div`
    background: ${colors.bg.secondary};
    text-align: center;
    width: 100vw;
    padding: 1em;
    font-size: 25px;
    font-weight: 900;
`

export {
    Background,
    Title
}
