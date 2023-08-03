import React from "react";
import Split from "react-split";
import Problem from "./Problem";
import Editor from "./Editor";
import Room from "../Room";

function Workspace() {
  return (
    <>
      <Split className="split max-h-screen p-[10px] overflow-hidden bg-[rgb(26,26,26)]">
        <Problem />
        <Editor />
      </Split>
      <Room />
    </>
  );
}

export default Workspace;
