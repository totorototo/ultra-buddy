import styled from "styled-components";

export default (Component) => styled(Component)`
  display: flex;
  overflow: auto;

  flex: none;
  width: 100%;
  flex-flow: row nowrap;
  scroll-snap-type: x mandatory;
  overflow: scroll;
  > div {
    text-align: center;
    scroll-snap-align: center;
    flex: none;
    line-height: 128px;
    font-size: 64px;
    width: 100px;
    height: 200px;
  }
`;
