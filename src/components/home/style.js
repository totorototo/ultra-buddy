import styled from "styled-components";

export default (Component) => styled(Component)`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
  padding: ${(props) => props.theme.space[3]}px;
  justify-content: center;

  .steps {
    font-family: roboto;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .connecting-line {
      border-bottom: 1px dashed #ffffff94;
      color: #ffffff94;
      background: transparent;
      width: 100%;
      margin-left: 20px;
      margin-right: 20px;
      &.done {
        filter: brightness(50%);
      }
    }

    .item {
      display: flex;

      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 24px;
      color: ${(props) => props.theme.colors.text};

      &.done {
        filter: brightness(50%);
      }

      &.current {
        filter: brightness(50%);
      }

      .index {
        border-radius: 50%;
        border: 1px solid;
        margin-top: 8px;
        margin-bottom: 8px;
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .label {
        font-size: 20px;
      }
    }
  }

  .content {
    margin-top: 40px;
    color: #ffffff94;
    display: flex;
    border: 1px dashed ${(props) => props.theme.colors.text};
    border-radius: ${(props) => props.theme.space[2]}px;
    width: 100%;
    height: 50%;

    .commands {
      font-family: roboto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;

      p {
        text-align: center;
        color: #ffffff94;
      }

      .file-upload {
        border: 1px solid #ffffff94;
        padding: ${(props) => props.theme.space[1]}px;
        border-radius: ${(props) => props.theme.space[1]}px;
      }
    }
  }

  .summary {
    color: #ffffff94;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50%;
    font-family: roboto;
    font-size: ${(props) => props.theme.space[4]}px;

    .flush {
      font-size: 16px;
      border: 1px solid #ffffff94;
      padding: ${(props) => props.theme.space[1]}px;
      border-radius: ${(props) => props.theme.space[1]}px;
    }
  }
`;
