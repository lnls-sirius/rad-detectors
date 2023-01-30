import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { AnimButton, CenterPosition, colors, ModalWrapper, properties, Square } from "../../assets/themes";

const Background = styled.div`
  ${ModalWrapper};
`

const EditionWrapper = styled.div`
  background: ${colors.bg.primary};
  width: 60em;
  height: 15em;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  margin: 1em 0.5em;
  padding: 2em;
  align-items: center;
  ${CenterPosition};
  border-radius: ${properties.border_radius.light};
  box-shadow:
      0.1em 0.1em 0.1em 0.1em ${colors.properties.shadow};
`

const FieldWrapper = styled.div`
  display: flex;
  padding: 0.5em 1em;
  align-items: center;
  justify-content: space-between;
  max-height: 5em;
  max-width: 75%;
`

const Icon = styled(FontAwesomeIcon)`
  width: 1.5em;
  height: 1.5em;
  padding: 0.2em;
  border-radius: ${
    properties.border_radius.light};
  ${AnimButton}
`

const SaveIcon = styled(Icon)`
  position: fixed;
  top: 0.75em;
  right: 3em;
  width: 1.5em;
  height: 1.5em;
`

const ColorPicker = styled.div`
  position: absolute;
  margin-top: 1.5em;
  z-index: 10;
  visibility: hidden;
`

const ColorSquare = styled(Square)`
  min-width: 1.5em;
  &:hover ${ColorPicker} {
    visibility: visible;
  }
`

const TextInput = styled.input`
  height: 1.5em;
  width: 10vw;
  margin-left: 1em;
  border-radius: ${
    properties.border_radius.light};
`

const SelectInput = styled.select`
  width: 8.5vw;
  text-align: center;
  border-radius: ${
    properties.border_radius.light};
`

export {
  Background,
  EditionWrapper,
  FieldWrapper,
  Icon,
  TextInput,
  SelectInput,
  ColorPicker,
  ColorSquare,
  SaveIcon
}
