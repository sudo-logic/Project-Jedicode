import React from "react";
import Split from "react-split";
import Problem from "./Problem";
import Editor from "./Editor";
import QTimer from "../../components/QTimer";
import Room from "../../components/Room";

function Workspace() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 1800);

  return (
    <>
      <Split className="split max-h-screen p-[10px] overflow-hidden bg-[rgb(26,26,26)]">
        <Problem />
        <Editor />
      </Split>
      <div className="p-[22px] flex justify-between gap-3 absolute right-0 top-0">
        <QTimer expiryTimestamp={time} />
        <Room />
      </div>
    </>
  );
}

export default Workspace;
