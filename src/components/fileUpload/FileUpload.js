import React from "react";
import styled from "styled-components";

import FileReader from "../fileReader/FileReader";

const Label = styled.label``;

const Input = styled.input`
  display: none;
`;

const Container = styled.div`
  display: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileUpload = ({ name, configuration, children, ...rest }) => {
  return (
    <FileReader configuration={configuration}>
      {({ readFile, isUploading, abort, data, aborted, file }) => (
        <Container>
          <Input type="file" onChange={readFile} id={name} {...rest} />
          <Label htmlFor={name}>{children}</Label>
          {file && aborted && <p>Upload Canceled on `{file.name}`</p>}
        </Container>
      )}
    </FileReader>
  );
};

export default FileUpload;
