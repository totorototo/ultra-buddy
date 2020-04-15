import styled from "styled-components";

export default (Component) => styled(Component)`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  flex-direction: column;

  .commands {
    padding: ${(props) => props.theme.space[5]}px;
    display: inline-block;
  }
`;
