import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import Split from "react-split";
import { javascript } from "@codemirror/lang-javascript";
import { atomone } from "@uiw/codemirror-theme-atomone";

function Editor() {
  return (
    <div className="flex flex-col bg-dark-layer-1">
      <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-1 text-white overflow-x-hidden">
        <div
          className={
            "bg-dark-layer-2 rounded-md mx-4 px-5 py-[10px] text-xs cursor-pointer "
          }
        >
          Javascript
        </div>
      </div>
      <Split
        className="h-[calc(100vh-94px)] mt-4 "
        direction="vertical"
        sizes={[70, 30]}
        minSize={70}
      >
        <div className="w-full bg-[rgb(26,26,26)] overflow-auto">
          <CodeMirror
            value="const a = 1"
            theme={atomone}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
          />
        </div>
        <div>test cases</div>
      </Split>
    </div>
  );
}

export default Editor;
