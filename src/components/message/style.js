import styled from "styled-components";

export default (Component) => styled(Component)`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: roboto;
  font-size: 20px;
  color: ${(props) => props.theme.colors.light};
  > svg {
    margin: ${(props) => props.theme.space[3]}px;
  }
`;
