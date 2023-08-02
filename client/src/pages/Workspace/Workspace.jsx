import React from "react";
import Split from "react-split";
import Problem from "./Problem";
import Editor from "./Editor";
import Room from "../Room";

function Workspace() {
  return (
    <>
      <Split className="split h-screen">
        <Problem />
        <Editor />
      </Split>
      <Room />
    </>
  );
}

export default Workspace;
