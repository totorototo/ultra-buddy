import styled from "styled-components";
import RadialProgressBar from "../radialProgressBar/RadialProgressBar";

export default (Component) => styled(Component)`
  align-self: center;
  justify-content: center;
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  color: #ffffff94;
  flex-direction: column;
  font-family: roboto;
  position: relative;
  font-size: ${(props) => props.theme.space[3]}px;
  ${RadialProgressBar} {
    margin-bottom: ${(props) => props.theme.space[5]}px;
  }
  .analytics {
    flex-direction: column;
    justify-content: center;
    display: flex;

    .item {
      margin: ${(props) => props.theme.space[1]}px;
      background-color: #3e3e3e;
      height: 2em;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-radius: ${(props) => props.theme.space[1]}px;
      padding-right: ${(props) => props.theme.space[2]}px;
      ::before {
        content: "";
        width: ${(props) => props.theme.space[1]}px;
        height: 100%;
        margin-right: ${(props) => props.theme.space[2]}px;
      }
      &.distance {
        margin-left: ${(props) => props.theme.space[3]}px;
        ::before {
          background-color: #42708c;
        }
      }
      &.gain {
        margin-left: ${(props) => props.theme.space[3] * 2}px;
        ::before {
          background-color: #d9a443;
        }
      }
      &.loss {
        margin-left: ${(props) => props.theme.space[3] * 3}px;
        ::before {
          background-color: #dc0073;
        }
      }
      &.checkpoint {
        ::before {
          background-color: #ffffff94;
        }
      }
    }
  }
`;
