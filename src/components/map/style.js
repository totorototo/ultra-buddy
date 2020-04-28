import styled from "styled-components";

export default (Component) => styled(Component)`
  align-self: center;
  display: flex;
  flex: 1 1 auto;
  height: 100%;

  .wrapper {
    align-self: center;
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    color: #ffffff94;
  }

  .fab {
    position: absolute;
    bottom: 20px;
    right: 20px;
    border-radius: 50px;
    width: 40px;
    height: 40px;
    background-color: #ffffffbb;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    z-index: 2;

    &.hide {
      display: none;
    }
  }

  .current-section {
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: roboto;
    writing-mode: vertical-rl;
    text-orientation: sideways;
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
    border-top-left-radius: ${(props) => props.theme.space[2]}px;
  }
  .mapboxgl-ctrl-bottom-right {
    display: none;
  }
  .mapboxgl-ctrl-bottom-left {
    display: none;
  }
`;
