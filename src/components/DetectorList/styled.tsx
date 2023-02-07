import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { AnimButton, colors, properties } from "../../assets/themes";

const ItemWrapper = styled.div`
  background: ${colors.bg.secondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5em 1em;
  padding: 0.25em 0.2em;
  border-radius: ${
    properties.border_radius.light};
`;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 33%);
  align-content: flex-start;
  overflow: scroll;
  width: 100%;
  height: 90vh;
  margin: 1vh 0vh;
`;

const Text = styled.span`
  width: 7.5em;
  text-align: center;
  vertical-align: middle;
  margin: 0em 0.5em;
`;

export {
  ItemWrapper,
  ListWrapper,
  Text
}
