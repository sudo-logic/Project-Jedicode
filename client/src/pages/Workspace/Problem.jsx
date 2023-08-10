import React, { useEffect, useState } from "react";

function Problem() {
  const [data, setData] = useState();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    fetch(
      "http://34.100.255.183/questions/a76b8c56-284c-412f-b086-1b06d23bb4bc"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoad(false);
      });
  }, []);

  return (
    <div className="bg-dark-layer-1 h-screen">
      {/* TAB */}
      {load ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-1 text-white overflow-x-hidden">
            <div
              className={
                "bg-dark-layer-2 rounded-md mx-4 px-5 py-[10px] text-xs cursor-pointer font-medium"
              }
            >
              Description
            </div>
          </div>

          <div className="flex px-0 py-4 h-[calc(100vh-44px)] overflow-y-auto">
            <div className="px-5">
              {/* Problem heading */}
              <div className="w-full">
                <div className="flex space-x-4">
                  <div className="mr-2 text-xl text-white font-bold">
                    1. {data?.title}
                  </div>
                  <div
                    className={`text-olive bg-olive rounded-[21px] bg-opacity-[.15] px-2.5 pt-[6px] text-xs font-medium uppercase`}
                  >
                    {data?.difficulty}
                  </div>
                </div>

                {/* Problem Statement(paragraphs) */}
                <div className="text-white text-sm mt-4">
                  {data?.problem_statement}
                </div>

                {/* Examples */}
                <div className="mt-4">
                  {data?.examples.map((example, id) => (
                    <div>
                      <p className="font-medium text-white ">Example {id + 1}: </p>
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
                      <li className="mt-2">
                        <code>{contraint}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Problem;
