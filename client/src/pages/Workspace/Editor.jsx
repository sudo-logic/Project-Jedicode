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
import { useNavigate } from "react-router-dom";
import ModalIconActionButtons from "../../components/EndTestButton";

function Editor() {

  const navigate = useNavigate();

  const [code, setCode] = useState(`print("Hello World")`);
  const [codeResponse, setCodeResponse] = useState([]);
  const [submitResponse, setSubmitResponse] = useState({});
  const [load, setLoad] = useState(true);
  const [uuid, setUUID] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const state = useSnapshot(globalState);
  const token = localStorage.getItem("token");

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
      language_id: globalState.languageId,
      question_id: globalState.questionId,
      code: code,
    };

    e.preventDefault();

    axios
      .post(`/runner`, judgeBody)
      .then((response) => {
        console.log(response.data[0].stdout);
        setCodeResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    const judgeBody = {
      language_id: globalState.languageId,
      question_id: globalState.questionId,
      code: code,
      language: "python",
      user_id: uuid,
    };

    e.preventDefault();

    axios
      .post(`/submissions`, judgeBody)
      .then((response) => {
        console.log("Yeh hai submit ka pehla response", response.data.score);
        setScore(response.data.score);
        setSubmitResponse(response.data.score);
      })
      .then(() => {
        toast.success("Code submitted");
        setSubmitted(true);
        console.log("Yeh hai submit response", submitResponse);
        // setScore(response.score);
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
          return (
            <div key={id}>
              {response?.stdout === null || response === undefined ? (
                <></>
              ) : (
                <div className="text-slate-200 w-52 justify-between text-lg flex flex-row items-start gap-2 -mt-20 ">
                  test case {id + 1}: <p>{response.stdout}</p>
                  {response.status.id === 4 ? (
                    <AiOutlineClose className="text-red-500 text-2xl" />
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
                <div className="text-red-600 text-lg flex -mt-20">
                  {id === 0 ? codeResponse[0]?.stderr : <></>}
                </div>
              )}
            </div>
          );
        })}
      </Split>
      <div className="flex flex-row relative justify-end gap-10 mt-3 mb-5 mr-10">
        {/* <button onClick={() => console.log(`stored ${state.languageId}`)}>Tester</button> */}

        {submitted ? (
          <p className="absolute top-1/4 left-2 underline underline-offset-4 text-white">
            Score: {score}
          </p>
        ) : (
          <></>
        )}

        {submitted ? (
          <button className="w-24 rounded-md px-3 py-2 bg-blue-500 text-black hover:shadow-[0_0_20px] hover:shadow-blue-500 transition-shadow">
            Next
          </button>
        ) : (
          <></>
        )}
        <ModalIconActionButtons />
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