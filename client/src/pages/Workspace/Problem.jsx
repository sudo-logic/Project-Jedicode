import React, { useEffect, useState } from "react";
import QuestionSelect from "../../components/QuestionSelect";
import axios from "axios";

function Problem() {
  const [data, setData] = useState();
  const [load, setLoad] = useState(true);

  const getQuestion = (question) => {
    setLoad(true);
    setData(question);
    setLoad(false);
  };

  return (
    <div className="bg-dark-layer-1 rounded-md overflow-y-hidden">
      {/* TAB */}
      <div className="flex w-full items-center bg-dark-layer-1 rounded-md">
        <QuestionSelect onChange={getQuestion} />
      </div>
      {load ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="flex pb-2  h-[calc(100vh-44px)]">
            <div className="px-4 pt-2 pb-8 overflow-y-scroll w-full">
              {/* Problem heading */}
              <div className="flex space-x-4">
                <div className="mr-2 text-xl text-white font-bold">
                  1. {data?.title}
                </div>
                <div className="flex justify-center items-center text-olive bg-olive rounded-[21px] bg-opacity-[0.15] px-2.5 ">
                  <div className={` text-xs font-medium uppercase`}>
                    {data?.difficulty}
                  </div>
                </div>
              </div>

              {/* Problem Statement(paragraphs) */}
              <div className="text-white text-sm mt-4">
                {data?.problem_statement}
              </div>

              {/* Examples */}
              <div className="mt-4">
                {data?.examples.map((example, id) => (
                  <div key={id}>
                    <p className="font-medium text-white ">
                      Example {id + 1}:{" "}
                    </p>
                    <div className="example-card bg-dark-layer-2 text-white rounded-md">
                      <pre>
                        <strong className="text-white">Input: </strong>{" "}
                        {example.input} <br />
                        <strong>Output: </strong>
                        {example.output} <br />
                        {/* <strong>Explanation: </strong>Because nums[0] +
                        nums[1] == 9, we return [0, 1]. */}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="my-5">
                <div className="text-white text-sm font-medium">
                  Constraints:
                </div>
                <ul className="text-white ml-5 list-disc">
                  {data?.constraints.map((contraint, id) => (
                    <li className="mt-2" key={id}>
                      <code>{contraint}</code>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Problem;
