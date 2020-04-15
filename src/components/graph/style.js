import styled from "styled-components";

export default (Component) => styled(Component)`
  position: relative;

  > svg {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
