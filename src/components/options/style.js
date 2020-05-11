import styled from "styled-components";

export default (Component) => styled(Component)`
  margin-top: 3em;
  flex-wrap: wrap;
  justify-content: center;
  align-self: flex-start;
  display: flex;
  height: 50%;
  svg {
    margin: 1em;
    :hover {
      cursor: pointer;
    }
  }
`;
