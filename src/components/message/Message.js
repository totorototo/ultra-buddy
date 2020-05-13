import React from "react";

import styled from "./style";

const Message = ({ className, message, children }) => {
  return (
    <div className={className}>
      {children}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default styled(Message);
