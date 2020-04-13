import styled from "styled-components";

export default (Component) => styled(Component)`
  display: flex;
  overflow: auto;
  flex: none;
  width: 100%;
  flex-flow: row nowrap;
  scroll-snap-type: x mandatory;
  overflow: scroll;
`;