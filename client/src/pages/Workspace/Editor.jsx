import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import Split from "react-split";
import { javascript } from "@codemirror/lang-javascript";
import { atomone } from "@uiw/codemirror-theme-atomone";
import LangDropdown from "../../components/LangDropdown";
import axios from "axios";
import { globalState } from "../../utils/proxy";
import { useSnapshot } from "valtio";

function Editor() {
  const [code, setCode] = useState("const a = 100;");
  const [codeResponse, setCodeResponse] = useState([]);
  const [load, setLoad] = useState(true);
  const [uuid, setUUID] = useState("")

  const state = useSnapshot(globalState)

  const token = localStorage.getItem("token")
  axios
    .get(`${state.apiURI}/auth/profile`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setUUID(response.data.sub);
      setLoad(false);
    })
    .catch((error) => {
      console.log(error);
    });
  
  const handleRun = (e) => {
    const judgeBody = {
      language_id: 71,
      question_id: "a76b8c56-284c-412f-b086-1b06d23bb4bc",
      code: code,
    };

    e.preventDefault();
    fetch(`${state.apiURI}/runner`, {
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

  const handleSubmit = (e) => {
    const judgeBody = {
      language_id: 71,
      question_id: "a76b8c56-284c-412f-b086-1b06d23bb4bc",
      code: code,
      language: "python",
      user_id: uuid,
    };

    e.preventDefault();
    fetch(`${state.apiURI}/submissions`, {
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
    <div className="flex flex-col bg-dark-layer-2 rounded-md ">
      <div className="flex w-full items-center bg-dark-layer-1 text-white rounded-t-md">
        {/* <div
          className={
            "bg-dark-layer-2 rounded-md mx-2 px-5 py-[10px] text-xs cursor-pointer "
          }
        >
          Javascript
        </div> */}
        <LangDropdown />
      </div>
      <Split
        className="h-[calc(100vh-72px)] "
        direction="vertical"
        sizes={[70, 30]}
        minSize={70}
      >
        <div className="w-full bg-dark-layer-1 overflow-auto rounded-b-md">
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
        <div className="bg-black rounded-md mb-2">test cases</div>
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
      <div className="flex flex-row justify-end gap-10 mt-3 mb-5 mr-10">
        <button
          className="w-24 rounded-md px-3 py-2 bg-white text-black hover:shadow-[0_0_20px] hover:shadow-white transition-shadow"
          onClick={handleRun}
        >
          Run
        </button>
        <button className="w-24 rounded-md px-3 py-2  bg-green-500 text-white hover:shadow-[0_0_20px] hover:shadow-green-500 transition-shadow" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Editor;
