import styled from "styled-components";

export default (Component) => styled(Component)`
  position: relative;
  opacity: ${(props) => props.opacity || 1};
  > svg {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
