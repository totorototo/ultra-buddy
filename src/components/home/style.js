import styled from "styled-components";

export default Component => styled(Component)`
  align-self: center;
  width: 320px;
  height: 320px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  margin-bottom: 10px;
  overflow: scroll;
  position: relative;
  border: 1px dashed ${props => props.theme.colors.text};
  border-radius: ${props => props.theme.space[2]}px;

  &.x-mandatory {
    scroll-snap-type: x mandatory;
  }

  &.x-scroll .wrapper {
    width: 1240px;
  }

  &.x-scroll .element {
    float: left;
    margin-right: 10px;
  }

  .element {
    width: 300px;
    height: 300px;
    scroll-margin: 10px;
    scroll-snap-align: start;
    scroll-snap-stop: normal;
    color: white;
    font-size: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .element:nth-child(1) {
    background: ${props => props.theme.colors.background};
  }
  .element:nth-child(2) {
    background: ${props => props.theme.colors.background};
  }
  .element:nth-child(3) {
    background: ${props => props.theme.colors.background};
  }
  .element:nth-child(4) {
    background: ${props => props.theme.colors.background};
  }
`;
