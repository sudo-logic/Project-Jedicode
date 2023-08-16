import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import Split from "react-split";
import { javascript } from "@codemirror/lang-javascript";
import { atomone } from "@uiw/codemirror-theme-atomone";

function Editor() {
  const [code, setCode] = useState("const a = 100;");
  const [codeResponse, setCodeResponse] = useState([]);
  
  const handleRun = (e) => {
    const judgeBody = {
      language_id: 71,
      question_id: "a76b8c56-284c-412f-b086-1b06d23bb4bc",
      code: code,
    };

    e.preventDefault();
    fetch("http://34.100.255.183/runner", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(judgeBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCodeResponse(data);
      });
  };

  const handleCodeInput = (editor, data, value) => {
    setCode(editor);
  };

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
            value={code}
            theme={atomone}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
            onChange={(editor, data, value) => {
              handleCodeInput(editor, data, value);
            }}
            className="cursor-text"
          />
        </div>
        <div>test cases</div>
        {codeResponse[0]?.stdout === null || codeResponse[0] === undefined ? (
          <></>
        ) : (
          <div className="text-green-600 text-lg flex -mt-20">
            OUTPUT: <br />
            {codeResponse[0]?.stdout}
          </div>
        )}
        {codeResponse[0]?.stderr === null || codeResponse[0] === undefined ? (
          <></>
        ) : (
          <div className="text-red-600 text-lg flex -mt-20">
            ERROR:
            {codeResponse[0]?.stderr}
          </div>
        )}
      </Split>
      <div className="flex flex-row justify-end gap-10 mb-5 mr-10">
        <button
          className="w-24 rounded-md px-3 py-2 bg-white text-black hover:shadow-[0_0_20px] hover:shadow-white transition-shadow"
          onClick={handleRun}
        >
          Run
        </button>
        <button className="w-24 rounded-md px-3 py-2  bg-green-500 text-white hover:shadow-[0_0_20px] hover:shadow-green-500 transition-shadow">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Editor;
