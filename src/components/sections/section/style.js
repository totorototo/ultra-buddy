import styled from "styled-components";

export default (Component) => styled(Component)`
  align-self: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  scroll-snap-align: center;
  flex: none;
  width: 100px;
  height: 200px;
`;
