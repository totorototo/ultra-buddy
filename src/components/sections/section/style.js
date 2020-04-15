import styled from "styled-components";

export default (Component) => styled(Component)`
  align-self: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  position: relative;
  scroll-snap-align: center;
  flex: none;
`;
