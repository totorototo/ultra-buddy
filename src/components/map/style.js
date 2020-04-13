import styled from "styled-components";

export default (Component) => styled(Component)`
  align-self: center;
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  padding: ${(props) => props.theme.space[2]}px;

  .wrapper {
    align-self: center;
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    border-radius: ${(props) => props.theme.space[2]}px;
    background-color: #ffffff94;
  }

  .current-section {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: roboto;
    writing-mode: vertical-rl;
    text-orientation: sideways;
    border-top-left-radius: ${(props) => props.theme.space[2]}px;
    border-bottom-left-radius: ${(props) => props.theme.space[2]}px;
  }

  .mapboxgl-map {
    border-radius: ${(props) => props.theme.space[2]}px;
  }
  .mapboxgl-ctrl-bottom-right {
    display: none;
  }
  .mapboxgl-ctrl-bottom-left {
    display: none;
  }
`;
