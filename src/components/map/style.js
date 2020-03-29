import styled from "styled-components";

export default Component => styled(Component)`
  align-self: center;
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  border-radius: ${props => props.theme.space[2]}px;
  .mapboxgl-map {
    border-radius: ${props => props.theme.space[2]}px;
  }
  .mapboxgl-ctrl-bottom-right {
    display: none;
  }
  .mapboxgl-ctrl-bottom-left {
    display: none;
  }
`;
