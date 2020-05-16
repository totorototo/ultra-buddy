import styled from "styled-components";

export default (Component) => styled(Component)`
  postion: relative;
  font-family: roboto;

  .intervals {
    .area {
      :nth-of-type(even) {
        fill: #aeaeae;
      }
      :nth-of-type(odd) {
        fill: #cecece;
      }
    }
    .label {
      font-weight: bolder;
      :nth-of-type(even) {
        fill: #cecece;
      }
      :nth-of-type(odd) {
        fill: #aeaeae;
      }
    }
    .line {
      stroke-width: 2;
      opacity: 0.4;
      stroke: white;
      stroke-dasharray: 4 4;
      :last-of-type {
        stroke-width: 0;
      }
      :first-of-type {
        stroke-width: 0;
      }
    }
  }

  .interval {
    stroke-width: 2;
    opacity: 0.4;
    stroke: #383838;
  }

  .checkpoints {
    .line {
      opacity: 0.4;
      stroke: #383838;
      stroke-dasharray: 4 4;
      :first-child {
        stroke-width: 0;
      }
      :last-child {
        stroke-width: 0;
      }
    }
  }
  // display: flex;
  // position: relative;
  // flex-direction: column;
  // flex: 1 1 auto;
  // height: 100%;
  // width: 100%;
  // justify-content: center;
  // .table {
  //   height: 100%;
  //   width: 100%;
  //   background-color: pink;
  //   position: relative;
  //   overflow-y: scroll;
  //   .day {
  //     position: absolute;
  //     display: flex;
  //     flex: 1;
  //     width: 100%;
  //     flex-direction: column;
  //     :nth-child(even) {
  //       background-color: red;
  //     }
  //     :nth-child(odd) {
  //       background-color: green;
  //     }
  //   }
  //   .checkpoint {
  //     :not(:last-child) {
  //       border-bottom: 1px dashed;
  //     }
  //     // :nth-child(even) {
  //     //   background-color: brown;
  //     // }
  //     // :nth-child(odd) {
  //     //   background-color: blue;
  //     // }
  //   }
  // }
`;
