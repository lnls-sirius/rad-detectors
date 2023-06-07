import styled from "styled-components";
import { colors, properties } from "../../assets/themes";

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 2em;
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const FooterText = styled.div`
  background: ${colors.bg.secondary};
  text-align: center;
  width: 100%;
  font-size: 14px;
  padding: 1em 0em;
`

const Contact = styled.span`
  background: ${colors.bg.secondary_dark};
  margin: 1em 2em;
  padding: 0.5em 2em;
  font-style: oblique;
  font-weight: 900;
  border-radius: ${
    properties.border_radius.light};
`

export {
  ContactWrapper,
  FooterWrapper,
  FooterText,
  Contact
}
