import React from "react";

const Error = ({ message }) => {
  return <>{message && <div className="error">{message}</div>}</>;
};

export default Error;
