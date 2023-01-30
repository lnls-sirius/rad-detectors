import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { StateStr } from "../../assets/interfaces/patterns";
import { AnimButton, colors, properties } from "../../assets/themes";

const ItemWrapper = styled.div`
  background: ${colors.bg.secondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  border-radius: ${
    properties.border_radius.light};
`;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  align-content: flex-start;
  overflow: scroll;
  width: 50%;
  height: 98vh;
  margin: 1vh;
`;

const Square = styled.div`
  width: 1.5em;
  height: 1.5em;
  margin: 0em 0.5em;
  border-radius: ${
    properties.border_radius.light};
  background-color: ${
    (props: StateStr) => props.value}
`

const Icon = styled(FontAwesomeIcon)`
  width: 1.5em;
  height: 1.5em;
  padding: 0.2em;
  border-radius: ${
    properties.border_radius.light};
  ${AnimButton}
`

const Text = styled.span`
  width: 7.5em;
  text-align: center;
  vertical-align: middle;
  margin: 0em 0.5em;
`;

export {
  ItemWrapper,
  ListWrapper,
  Square,
  Icon,
  Text
}
