import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import Split from "react-split";
import { javascript } from "@codemirror/lang-javascript";
import { atomone } from "@uiw/codemirror-theme-atomone";

function Editor() {
  return (
    <div className="flex flex-col bg-dark-layer-2 rounded-md ">
      <div className="flex w-full items-center pt-2 pb-2 bg-dark-layer-1 text-white overflow-x-hidden rounded-t-md">
        <div
          className={
            "bg-dark-layer-2 rounded-md mx-2 px-5 py-[10px] text-xs cursor-pointer "
          }
        >
          Javascript
        </div>
      </div>
      <Split
        className="h-[calc(100vh-72px)] "
        direction="vertical"
        sizes={[70, 30]}
        minSize={70}
      >
        <div className="w-full bg-dark-layer-1 overflow-auto rounded-b-md">
          <CodeMirror
            value="const a = 1"
            theme={atomone}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
          />
        </div>
        <div className="bg-dark-layer-1 rounded-md p-2 h-full text-white">
          test cases
        </div>
      </Split>
    </div>
  );
}

export default Editor;
