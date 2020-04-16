import styled from "styled-components";

const OFFSET = "45";

export default (Component) => styled(Component)`
  display: flex;
  flex: 1 1 auto;
  height: 100vh;

  .sections-wrapper .container .section-content {
    display: flex;
    flex: 1 1 auto;
    width: 100%;
  }

  .sections-wrapper .container {
    height: 100%;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    .icons {
      margin-top: 3em;

      flex-wrap: wrap;
      justify-content: center;
      display: flex;
      svg {
        margin: 1em;
        :hover {
          cursor: pointer;
        }
      }
    }
  }

  .sections-wrapper {
    -webkit-tap-highlight-color: transparent;
    height: 100%;
    width: 100%;
    background: ${(props) => props.theme.colors.background};
    overflow: hidden;
    position: relative;
    margin: 0px auto 0;
  }

  section {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.3s;

    &.one {
      background: ${(props) => props.theme.colors.one};
      transition-delay: 0s;
    }

    &.two {
      background: ${(props) => props.theme.colors.two};
      transition-delay: 0.05s;
    }

    &.three {
      background: ${(props) => props.theme.colors.three};
      transition-delay: 0.1s;
    }

    &.four {
      background: ${(props) => props.theme.colors.four};
      transition-delay: 0.15s;
    }

    &.five {
      background: ${(props) => props.theme.colors.five};
      transition-delay: 0.2s;
    }

    &.after {
      transform: translateY(100%);
    }
  }

  h1 {
    color: ${(props) => props.theme.colors.text};
    width: 100%;
    font-weight: 400;
    font-size: 1.6rem;
    text-align: center;
    margin: 0;
    line-height: ${OFFSET}px;
    user-select: none;
    cursor: pointer;
  }

  .menu-open {
    section {
      cursor: pointer;

      &.one {
        transform: translateY(${OFFSET}px);
        transition-delay: 0.15s;
        &:active {
          background: lighten(${(props) => props.theme.colors.one}, 3%);
        }
      }

      &.two {
        transform: translateY(${OFFSET * 2}px);
        transition-delay: 0.1s;
        &:active {
          background: lighten(${(props) => props.theme.colors.two}, 3%);
        }
      }

      &.three {
        transform: translateY(${OFFSET * 3}px);
        transition-delay: 0.05s;
        &:active {
          background: lighten(${(props) => props.theme.colors.three}, 3%);
        }
      }

      &.four {
        transform: translateY(${OFFSET * 4}px);
        transition-delay: 0s;
        &:active {
          background: lighten(${(props) => props.theme.colors.four}, 3%);
        }
      }

      &.five {
        transform: translateY(${OFFSET * 5}px);
        transition-delay: 0s;
        &:active {
          background: lighten(${(props) => props.theme.colors.five}, 3%);
        }
      }
    }
  }
`;
