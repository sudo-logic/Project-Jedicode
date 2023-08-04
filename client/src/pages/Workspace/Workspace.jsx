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
      <div className="p-[22px] flex justify-end absolute right-0 top-0">
        {" "}
        <Room />
        {/* <Timer/> */}
      </div>
    </>
  );
}

export default Workspace;
