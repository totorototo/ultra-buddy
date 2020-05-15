import styled from "styled-components";

export default (Component) => styled(Component)`
  postion: relative;

  .intervals {
    .area {
      :nth-of-type(even) {
        fill: #444444;
      }
      :nth-of-type(odd) {
        fill: #333333;
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
    }
  }

  .interval {
    stroke-width: 2;
    opacity: 0.4;
    stroke: white;
  }

  .checkpoints {
    .line {
      opacity: 0.4;
      stroke: white;
      stroke-dasharray: 4 4;
      :first-child {
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
