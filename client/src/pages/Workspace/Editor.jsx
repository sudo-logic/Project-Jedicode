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
import {
  language_mapping,
  judge_langs,
  init_templates,
} from "../../utils/extras";
import { subscribeKey, useProxy } from "valtio/utils";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";

function Editor() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`print("Hello World")`);
  const [codeResponse, setCodeResponse] = useState([]);
  const [load, setLoad] = useState(true);
  const [extensions, setExtensions] = useState([]);
  const state = useSnapshot(globalState);
  const $state = useProxy(globalState, { sync: true });
  const token = localStorage.getItem("token");

  subscribeKey(globalState, "questionId", () => {
    // setCode("");
    setCodeResponse([]);
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
        // console.log(response.data[0].stdout);
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
      user_id: state.profile.sub,
      room_id: state.room.id,
    };

    e.preventDefault();

    // console.log(
    //   "Player Data Array before axios request",
    //   $state.room.player_data
    // );

    await axios
      .post(`/submissions`, judgeBody)
      .then((response) => {
        toast.success("Code submitted");
        $state.submissions[state.questionId] = response.data;

        // FIXME:
        // let endTime = { endTime: Date.now() };
        // $state.questionTime[state.questionId] = endTime;
        // console.log("Question end time: ", $state.questionTime);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(
    //   "Player Data Array after axios request",
    //   $state.room.player_data
    // );

    $state.room = await axios
      .get(`/rooms/${state.room.id}`)
      .then((response) => {
        // console.log("Room updated", response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // go through all submissions and calculate sum of scores
    let totalScore = 0;
    for (let key in $state.submissions) {
      totalScore += $state.submissions[key].score;
    }
    // console.log("Total Score", totalScore);

    // update player_data array
    $state.room.player_data.forEach((player) => {
      if (player.user_id == state.profile.sub) {
        player.score = totalScore;
      }
    });

    // console.log(
    //   "Player Data Array after updating score",
    //   $state.room.player_data
    // );

    // update room in database
    $state.room = await axios
      .put(`/rooms/${state.room.id}`, { player_data: $state.room.player_data })
      .then((response) => {
        // console.log("Room updated", response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    if (
      Object.keys($state.submissions).length === state.room.questions.length
    ) {
      toast(
        <div>
          All questions are complete! <br /> You may end the test now or wait
          for your friends. 🐱
        </div>
      );
    }
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
    // navigate("/dashboard");
    return;
  };

  useEffect(() => {
    const lang = judge_langs.find((lang) => lang.id === state.languageId);

    if (lang && language_mapping[lang.name]) {
      setExtensions([loadLanguage(language_mapping[lang.name])]);

      if (init_templates[language_mapping[lang.name]]) {
        setCode(init_templates[language_mapping[lang.name]]);
      } else {
        setCode("");
      }
    } else {
      setExtensions([]);
    }
  }, [state.languageId]);

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
            extensions={extensions}
            style={{ fontSize: 16 }}
            onChange={(editor, data, value) => {
              handleCodeInput(editor, data, value);
            }}
            className="cursor-text"
          />
        </div>
        <div className="bg-black rounded-md p-3 text-white h-full overflow-y-auto">
          <div className="p-1.5 font-bold px-[14px] bg-dark-layer-2 rounded-md w-fit h-fit">
            Results
          </div>

          {codeResponse.map((response, id) => {
            return (
              <div className="py-3" key={id}>
                {response === undefined ? (
                  <></>
                ) : (
                  <div className="text-white gap-8 justify-start flex flex-row items-start  ">
                    <span className="">
                      Test&nbsp;case&nbsp;{id + 1}:{/* to review later */}
                    </span>

                    {response.status.id === 4 ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-4 items-center">
                          <p className="text-red-500 h-full font-medium">
                            {response.status.description}
                            {/* aierubfl */}
                          </p>
                        </div>
                        <div className="p-3 px-4 bg-dark-layer-2 rounded-md flex">
                          <p className="font-mono">Output:&nbsp;</p>
                          <p className="font-mono ">{response.stdout}</p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {response.status.id === 3 ? (
                      <>
                        {/* <BsCheck className="text-green-500 text-2xl" /> */}
                        <p className="text-green-500 text-2xl">
                          {response.status.description}
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                    {response.status.id === 11 ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-4">
                          {/* <AiOutlineClose className="text-red-500" /> */}
                          <div className="flex flex-col gap-4">
                            <p className="text-red-500 h-full font-semibold">
                              {response.status.description}
                            </p>
                            <p>{response.stderr}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
                {response?.stderr === null || response === undefined ? (
                  <></>
                ) : (
                  // <div className="text-red-600 code text-lg flex">
                  //   {/* for default error ids */}
                  //   {id === 0 ? codeResponse[0]?.stderr : <></>}
                  // </div>
                  <div></div>
                )}
              </div>
            );
          })}
        </div>
      </Split>
      <div className="absolute bottom-6 right-6  ">
        <div className="flex flex-row relative justify-end gap-8">
          {state.submissions[state.questionId] ? (
            <p className="absolute top-1/4 left-[-6rem] underline underline-offset-4 text-white ">
              Score: {state.submissions[state.questionId].score}
            </p>
          ) : (
            <></>
          )}

          {state.submissions[state.questionId] ? (
            <>
              {Object.keys(state.submissions).length ===
              state.room.questions.length ? (
                <ModalIconActionButtons />
              ) : (
                <>
                  <button
                    className="w-24 rounded-md px-3 py-2 bg-blue-500 font-semibold opacity-90 text-black  hover:opacity-100 transition-all"
                    onClick={handleNextClick}
                  >
                    Next
                  </button>
                </>
              )}
            </>
          ) : (
            <></>
          )}
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
