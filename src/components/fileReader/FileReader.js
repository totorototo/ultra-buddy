import React, { useState } from "react";

export const fileType = {
  text: "readAsText",
  binary: "readAsBinaryString",
  array: "readAsArrayBuffer",
};

const FileReader = ({
  children,
  configuration = {
    extension: "gpx",
    type: fileType.text,
    handleFileRead: () => {},
    parameters: ["utf8"],
  },
}) => {
  const [state, setState] = useState({
    file: null,
    isUploading: false,
    aborted: false,
    data: null,
  });

  const readFile = (event) => {
    const file = event.target.files[0];
    const reader = new window.FileReader();

    if (file) {
      const regex = RegExp(`.(${configuration.extension})$`, "i");
      if (regex.test(file.name)) {
      } else {
        alert(
          `Invalid file type: '${file.type}'. Please only upload ${configuration.extension}`
        );
        console.warn(`Invalid file type: '${file.type}'`);
        return;
      }
      setState({ ...state, file });
      reader[configuration.type](file, ...configuration.parameters);
    }

    reader.onload = () => {
      const data = reader.result;
      configuration.handleFileRead(file.name, data);
    };

    const abort = () => reader.abort();

    reader.onabort = () => {
      setState({
        ...state,
        aborted: true,
        file,
      });
    };

    reader.onloadstart = () => {
      setState({ ...state, isUploading: true, abort });
    };
  };

  return children({ readFile, ...state });
};

export default FileReader;
