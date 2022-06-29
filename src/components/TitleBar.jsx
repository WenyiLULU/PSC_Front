import React from "react";
import "../App.css";

const TitleBar = (props) => {
  return (
    <div className="titleBar">
      <h1>{props.title}</h1>
      <div className="titleOptions">{props.options}</div>
    </div>
  );
};

export default TitleBar;
