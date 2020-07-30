import styled from "styled-components";

export default (Component) => styled(Component)`
  font-family: roboto;
  font-size: 10px;

  position: relative;
  opacity: ${(props) => props.opacity || 1};
  > svg {
    > text {
      font-weight: bolder;
      fill: #ffffff94;
      text-anchor: middle; /* align center */
      dominant-baseline: middle; /* vertical alignment fix */
    }
    position: absolute;
    top: 0;
    left: 0;
  }
`;
