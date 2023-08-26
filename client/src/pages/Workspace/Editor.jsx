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
import ModalIconActionButtons from "../../components/EndTestButton";
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
        console.log(response.data[0].stdout);
        setCodeResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    const judgeBody = {
      language_id: state.languageId,
      question_id: state.questionId,
      code: code,
      language: "python",
      user_id: uuid,
    };

    e.preventDefault();

    console.log("Player Data Array before axios request", $state.room.player_data);

    const sub = await axios
      .post(`/submissions`, judgeBody)
      .then((response) => {
        toast.success("Code submitted");
        $state.submissions[state.questionId] = response.data;
        console.log($state.submissions[state.questionId]);
        return response.data;
      })
      .then(() => {
        let player_data = $state.room.player_data;
        console.log("user_id", uuid)
        console.log("Player Data", player_data)
        let player_score = 0;
        for (let i = 0; i < player_data.length; i++) {
          if (player_data[i].user_id == state?.profile?.sub) {
            // player_data[i].score = $state.submissions[state.questionId].score;
            Object.values($state.submissions).forEach((item) => {
              player_score += item.score;
            });
            console.log("Player Score", player_score)
            player_data[i].score = player_score;
            console.log("Current Player Data")

            axios
              .put(`/rooms/${state?.room?.id}`, { player_data: player_data })
              .then(response => console.log("PUT Response", response))
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCodeInput = (editor, data, value) => {
    setCode(editor);
  };

  const handleNextClick = () => {
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
      <div className="flex w-full items-center bg-dark-layer-1 text-white rounded-t-md">
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

          <ModalIconActionButtons />
          <button
            className="w-24 rounded-md px-3 py-2 bg-white text-black hover:shadow-[0_0_20px] hover:shadow-white transition-shadow"
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
