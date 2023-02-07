import styled from "styled-components";
import { CenterPosition, colors, Icon, ModalWrapper, properties, Square } from "../../assets/themes";

const Background = styled.div`
  ${ModalWrapper};
`

const EditionWrapper = styled.div`
  background: ${colors.bg.primary};
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

const SaveIcon = styled(Icon)`
  position: fixed;
  top: 0.75em;
  right: 3em;
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
  width: 15vw;
  margin-left: 1em;
  border-radius: ${
    properties.border_radius.light};
`

const TextWrapper = styled.div`
  width: 10vw;
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
  TextWrapper,
  TextInput,
  SelectInput,
  ColorPicker,
  ColorSquare,
  SaveIcon
}
