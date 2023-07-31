import React from "react";
import Split from "react-split";
import Problemdescription from "./Problemdescription";
import Editor from "./Editor";

function Workspace() {
  return (
    <Split className="split h-screen">
      <Problemdescription />
      <Editor />
    </Split>
  );
}

export default Workspace;
