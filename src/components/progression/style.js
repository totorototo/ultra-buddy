import styled from "styled-components";

export default (Component) => styled(Component)`
  align-self: center;
  justify-content: center;
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  color: #ffffff94;
  flex-direction: column;
  font-family: roboto;
  // background-color: pink;
  position: relative;
  font-size: ${(props) => props.theme.space[3]}px;
`;
