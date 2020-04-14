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
    border-radius: ${(props) => props.theme.space[3]}px;
    background-color: #ffffff94;
  }

  .current-section {
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: roboto;
    writing-mode: vertical-rl;
    text-orientation: sideways;
    border-top-left-radius: ${(props) => props.theme.space[3]}px;
    border-bottom-left-radius: ${(props) => props.theme.space[3]}px;
    > div {
      &.departure {
        margin-top: auto;
        transform: rotate(0.5turn);
        margin-bottom: ${(props) => props.theme.space[5]}px;
      }
      &.arrival {
        transform: rotate(0.5turn);
        margin-top: ${(props) => props.theme.space[5]}px;
      }
    }
  }

  .mapboxgl-map {
    border-radius: ${(props) => props.theme.space[3]}px;
  }
  .mapboxgl-ctrl-bottom-right {
    display: none;
  }
  .mapboxgl-ctrl-bottom-left {
    display: none;
  }
`;
