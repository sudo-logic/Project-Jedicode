import React, { useEffect, useState } from "react";
import QuestionSelect from "../../components/QuestionSelect";
import Split from "react-split";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Problem() {
  const [data, setData] = useState();
  const [load, setLoad] = useState(true);

  const getQuestion = (question) => {
    setLoad(true);
    setData(question);
    setLoad(false);
  };

  let [categories] = [
    {
      First: [
        {
          id: 1,
          input: data?.test_cases[0].input,
          output: data?.test_cases[0].output,
        },
      ],
      Second: [
        {
          id: 1,
          input: data?.test_cases[1].input,
          output: data?.test_cases[1].output,
        },
      ],
    },
  ];

  return (
    <div className=" rounded-md overflow-y-hidden">
      {/* TAB */}
      <div className="flex w-full items-center bg-black rounded-t-md">
        <QuestionSelect onChange={getQuestion} />
      </div>
      {load ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* <div className="flex pb-2  h-[calc(100vh-44px)]"> */}
          <Split
            direction="vertical"
            sizes={[79.5, 20.5]}
            minSize={[450, 161]}
            className="flex pb-2 flex-col h-[calc(100vh-44px)] rounded-md"
          >
            <div className="px-4 pt-2 pb-8 overflow-y-scroll w-full bg-black rounded-b-md">
              {/* Problem heading */}
              <div className="flex space-x-4">
                <div className="mr-2 text-xl text-white font-bold">
                  {data?.title}
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
                    <div className="example-card bg-dark-layer-2 text-white w-fit rounded-md">
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
            <div className="p-3 rounded-md bg-black text-sm text-white">
              <div className="text-base text-white">
                {" "}
                <Tab.Group>
                  <div className="flex  gap-3">
                    <div className="p-1.5 px-3 bg-dark-layer-2 rounded-md w-fit font-bold h-fit">
                      Test cases
                    </div>
                    <Tab.List className="flex space-x-1 gap-3 justify-start bg-dark-layer-2 p-1.5 px-3 items-center rounded-md">
                      {Object.keys(categories).map((category) => (
                        <Tab
                          key={category}
                          className={({ selected }) =>
                            classNames(
                              "  rounded-md text-sm h-fit ",
                              "focus:outline-none",
                              selected ? "text-white  " : " opacity-40"
                            )
                          }
                        >
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels>
                    {Object.values(categories).map((cases, idx) => (
                      <Tab.Panel
                        key={idx}
                        className={classNames("mt-3", "focus:outline-none ")}
                      >
                        {cases.map((test) => (
                          <div
                            key={test.id}
                            className="example-card bg-dark-layer-2 text-white w-fit rounded-md"
                          >
                            <pre>
                              <strong className="text-white">Input: </strong>{" "}
                              {test.input} <br />
                              <strong>Output: </strong>
                              {test.output} <br />
                            </pre>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </Split>
          {/* </div> */}
        </div>
      )}
    </div>
  );
}

export default Problem;
