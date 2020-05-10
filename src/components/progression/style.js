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
    flex-wrap: wrap;
    justify-content: center;
    display: flex;
    width: 100%;
    .item {
      margin: ${(props) => props.theme.space[1]}px;
      background-color: #3e3e3e;
      height: 2em;
      display: flex;
      align-items: center;
      border-radius: ${(props) => props.theme.space[1]}px;
      padding-right: ${(props) => props.theme.space[2]}px;
      ::before {
        content: "";
        width: ${(props) => props.theme.space[1]}px;
        height: 100%;
        margin-right: ${(props) => props.theme.space[2]}px;
      }
      &.distance {
        ::before {
          background-color: #42708c;
        }
      }
      &.gain {
        ::before {
          background-color: #d9a443;
        }
      }
      &.loss {
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
