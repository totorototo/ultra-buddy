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
      width: 100%;
      align-items: center;

      .index {
        color: white;
        font-size: 150px;

        width: 40%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }

      .stats {
        width: 60%;
        display: flex;
        flex-direction: column;
        font-family: roboto;
        font-size: 14px;

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
