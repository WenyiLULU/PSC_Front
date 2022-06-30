import React from "react";
import "../App.css";
import {Title} from "@mantine/core"
const TitleBar = (props) => {
  return (
    <div className="titleBar">
      <Title order={1}>{props.title}</Title>
      <div className="titleOptions">{props.options}</div>
    </div>
  );
};

export default TitleBar;
