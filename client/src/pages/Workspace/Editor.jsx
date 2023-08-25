import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import Split from "react-split";
import { javascript } from "@codemirror/lang-javascript";
import { atomone } from "@uiw/codemirror-theme-atomone";
import LangDropdown from "../../components/LangDropdown";
import axios from "axios";
import { globalState } from "../../utils/proxy";
import { subscribe, useSnapshot } from "valtio";
import { BsCheck } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { subscribeKey, useProxy } from "valtio/utils";

function Editor() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`print("Hello World")`);
  const [codeResponse, setCodeResponse] = useState([]);
  const [load, setLoad] = useState(true);
  const [uuid, setUUID] = useState("");
  const state = useSnapshot(globalState);
  const $state = useProxy(globalState, { sync: true });
  const token = localStorage.getItem("token");

  subscribeKey(globalState, "questionId", () => {
    // setCode("");
    setCodeResponse([]);
  });

  axios
    .get(`/auth/profile`)
    .then((response) => {
      setUUID(response.data.sub);
      setLoad(false);
    })
    .catch((error) => {
      console.log(error);
    });

  const handleRun = (e) => {
    const judgeBody = {
      language_id: state.languageId,
      question_id: state.questionId,
      code: code,
    };

    e.preventDefault();

    axios
      .post(`/runner`, judgeBody)
      .then((response) => {
        console.log(response);
        setCodeResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    const judgeBody = {
      language_id: state.languageId,
      question_id: state.questionId,
      code: code,
      language: "python",
      user_id: uuid,
    };

    e.preventDefault();

    axios
      .post(`/submissions`, judgeBody)
      .then((response) => {
        toast.success("Code submitted");
        console.log(response.data);
        $state.submissions[state.questionId] = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCodeInput = (editor, data, value) => {
    setCode(editor);
  };

  const handleEndTest = () => {
    navigate("/dashboard");
    // .catch((err) => console.log("Fetch error", err));
  };

  const handleNextClick = () => {
    // go to the question which is not in the submissions else go to the dashboard
    // e.preventDefault();
    const questions = state.room.questions;
    const selected = state.selected;

    for (let i = questions.length - 1; i >= 0; i--) {
      if (!state.submissions[questions[i].id]) {
        $state.selected = questions[i];
        return;
      }
    }
    toast("All questions are complete!\nYou may now end the test. 🐱");
    // navigate("/dashboard");
    return;
  };

  return (
    <div className="flex flex-col bg-dark-layer-2 rounded-md ">
      <div className="flex w-full items-center bg-black text-white rounded-t-md">
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
        sizes={[75, 25]}
        minSize={[250, 175]}
      >
        <div className="w-full bg-black overflow-auto rounded-b-md relative">
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
        <div className="bg-black rounded-md p-3 text-white ">
          <div className="p-1.5 font-bold px-3 bg-dark-layer-2 rounded-md w-fit h-fit">
            Results
          </div>

          {codeResponse.map((response, id) => {
            return (
              <div className="py-3" key={id}>
                {response?.stdout === null || response === undefined ? (
                  <></>
                ) : (
                  <div className="text-white w-36 justify-between flex flex-row items-center  ">
                    test case {id + 1}:
                    {response.status.id === 4 ? (
                      <AiOutlineClose className="text-red-500 text-lg" />
                    ) : (
                      ""
                    )}{" "}
                    {response.status.id === 3 ? (
                      <BsCheck className="text-green-500 text-2xl" />
                    ) : (
                      ""
                    )}
                  </div>
                )}
                {response?.stderr === null || response === undefined ? (
                  <></>
                ) : (
                  <div className="text-red-600 code text-lg flex">
                    {id === 0 ? codeResponse[0]?.stderr : <></>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Split>
      <div className="absolute bottom-0 right-0 pb-6 pr-6">
        <div className="flex flex-row relative justify-end gap-8 ">
          {/* <button onClick={() => console.log(`stored ${state.languageId}`)}>Tester</button> */}

          {state.submissions[state.questionId] ? (
            <p className="absolute top-1/4 left-[-6rem] underline underline-offset-4 text-white">
              Score: {state.submissions[state.questionId].score}
            </p>
          ) : (
            <></>
          )}

          {state.submissions[state.questionId] ? (
            <button
              className="w-24 rounded-md px-3 py-2 bg-blue-500 font-semibold opacity-90 text-black  hover:opacity-100 transition-all"
              onClick={handleNextClick}
            >
              Next
            </button>
          ) : (
            <></>
          )}
          <button
            className="w-24 rounded-md px-3 py-2 font-semibold bg-yellow-500 text-black opacity-90 hover:opacity-100 transition-all"
            onClick={handleEndTest}
          >
            End Test
          </button>
          <button
            className="w-24 rounded-md px-3 py-2 font-semibold bg-white text-black opacity-90 hover:opacity-100 transition-all"
            onClick={handleRun}
          >
            Run
          </button>
          <button
            className="w-24 rounded-md px-3 py-2 font-semibold bg-green-600 text-white opacity-90 hover:opacity-100 transition-all"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Editor;
