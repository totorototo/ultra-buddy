import styled from "styled-components";
import Section from "../sections/section/Section";

export default (Component) => styled(Component)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  flex: 1 1 auto;
  width: 100%;
  position: relative;
  color: #ffffff94;

  .section {
    position: absolute;
    height: 200px;
    bottom: 0;
    left: 0;
    width: 100%;

    display: flex;
    overflow: auto;
    flex: none;
    flex-flow: row nowrap;
    scroll-snap-type: x mandatory;

    ${Section} {
      scroll-snap-align: center;
      width: 100%;
    }
  }

  .profile {
    display: flex;
    flex-direction: column;
    width: 100%;

    .bottom {
      height: 200px;
      width: 100%;
      background: #ffffff94;
    }
  }

  .analytics {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    width: 100%;
    margin-bottom: auto;
    align-items: center;
    justify-content: center;

    .data {
      display: flex;

      .index {
        color: white;
        font-size: 150px;
        margin-right: ${(props) => props.theme.space[2]}px;
      }
      .stats {
        display: flex;
        flex-direction: column;
        font-family: roboto;
        font-size: 12px;
        margin-left: ${(props) => props.theme.space[2]}px;

        .title {
          font-weight: bolder;
        }
        .item {
          margin-top: ${(props) => props.theme.space[2]}px;
          display: flex;
          flex-direction: column;
        }
      }
    }

    .row {
      display: flex;
      margin: ${(props) => props.theme.space[3]}px;
    }
  }
`;
