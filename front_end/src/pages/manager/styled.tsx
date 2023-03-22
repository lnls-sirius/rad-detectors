import styled from "styled-components";
import { colors, Icon } from "../../assets/themes";

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

const AddIcon = styled(Icon)`
    position: absolute;
    top: 0.75em;
    left: 3em;
`

export {
    Background,
    Title,
    AddIcon
}
