import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import Split from "react-split";
import { javascript } from "@codemirror/lang-javascript";
import { atomone } from "@uiw/codemirror-theme-atomone";
import LangDropdown from "../../components/LangDropdown";
import axios from "axios";
import { globalState } from "../../utils/proxy";
import { useSnapshot } from "valtio";
import { BsCheck } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

function Editor() {
  const [code, setCode] = useState("const a = 100;");
  const [codeResponse, setCodeResponse] = useState([]);
  const [load, setLoad] = useState(true);
  const [uuid, setUUID] = useState("");

  const state = useSnapshot(globalState);

  const token = localStorage.getItem("token");
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
      language_id: globalState.languageId,
      question_id: "a76b8c56-284c-412f-b086-1b06d23bb4bc",
      code: code,
    };

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
      language_id: globalState.languageId,
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
        toast.success("Code submitted")
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
        minSize={[250, 150]}
      >
        <div className="w-full bg-dark-layer-1 overflow-auto rounded-b-md relative">
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
          {/* <div className="flex flex-row justify-end gap-8 absolute bottom-0 right-0 p-3">
            <button
              className=" font-bold text-white"
              onClick={() => console.log(`stored ${state.languageId}`)}
            >
              Tester
            </button>
            <button
              className="w-24 rounded-md px-3 py-2 bg-white text-neutral-950 font-bold "
              onClick={handleRun}
            >
              Run
            </button>
            <button
              className="w-24 rounded-md px-3 py-2  bg-green-600 text-white font-bold"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div> */}
        </div>
        <div className="bg-black rounded-md p-3 text-white">test cases</div>
        {codeResponse.map((response, id) => {
          console.log(response);
          return (
            <div>
              {response?.stdout === null || response === undefined ? (
                <></>
              ) : (
                <div className="text-slate-200 w-36 justify-between text-lg flex flex-row items-start gap-2 -mt-20 ">
                  test case {id + 1}:
                  {response.status.id === 4 ? <AiOutlineClose className="text-red-500 text-2xl"/> : ""}{" "}
                  {response.status.id === 3 ? <BsCheck className="text-green-500 text-2xl"/> : ""}
                </div>
              )}
              {response?.stderr === null || response === undefined ? (
                <></>
              ) : (
                <div className="text-red-600 text-lg flex -mt-20">
                  {id === 0 ? codeResponse[0]?.stderr : <></>}
                </div>
              )}
            </div>
          );
        })}
      </Split>
      <div className="flex flex-row justify-end gap-10 mt-3 mb-5 mr-10">
        {/* <button onClick={() => console.log(`stored ${state.languageId}`)}>Tester</button> */}
        <button
          className="w-24 rounded-md px-3 py-2 bg-white text-black hover:shadow-[0_0_20px] hover:shadow-white transition-shadow"
          onClick={handleRun}
        >
          Run
        </button>
        <button
          className="w-24 rounded-md px-3 py-2  bg-green-500 text-white hover:shadow-[0_0_20px] hover:shadow-green-500 transition-shadow"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Editor;
