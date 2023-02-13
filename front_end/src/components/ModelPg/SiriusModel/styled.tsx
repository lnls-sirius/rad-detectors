import styled from "styled-components";
import model from '../../../assets/img/model_rad.png';
import { Coordinates } from "../../../assets/interfaces/patterns";

const Model = styled.div`
    background-image: url(${model});
    background-repeat: no-repeat;
    background-size: 70% 100%;
    background-position: center;
    width: 100vw;
    height: 100vh;
`;

const LedWrapper = styled.div`
    position: absolute;
    top: ${(props: Coordinates) => props.y}%;
    left: ${(props: Coordinates) => props.x}%;
`

export {
    Model,
    LedWrapper
}
