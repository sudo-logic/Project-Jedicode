import React from "react";

function Problem() {
  return (
    <div className="bg-dark-layer-1 h-screen">
      {/* TAB */}
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
                1. Two Sum
              </div>
              <div
                className={`text-olive bg-olive rounded-[21px] bg-opacity-[.15] px-2.5 pt-[6px] text-xs font-medium `}
              >
                Easy
              </div>
            </div>

            {/* Problem Statement(paragraphs) */}
            <div className="text-white text-sm">
              <p className="mt-3">
                Given an array of integers <code>nums</code> and an integer{" "}
                <code>target</code>, return indices of the two numbers such that
                they add up to&nbsp;
                <code>target</code>.
              </p>
              <p className="mt-3">
                You may assume that each input would have{" "}
                <strong>exactly one solution</strong>, and you may not use the
                same element twice.
              </p>
              <p className="mt-3">You can return the answer in any order.</p>
            </div>

            {/* Examples */}
            <div className="mt-4">
              {/* Example 1 */}
              <div>
                <p className="font-medium text-white ">Example 1: </p>
                <div className="example-card bg-dark-layer-2 text-white rounded-md">
                  <pre>
                    <strong className="text-white">Input: </strong>nums =
                    [2,7,11,15], target = 9 <br />
                    <strong>Output: </strong>[0,1] <br />
                    <strong>Explanation: </strong>Because nums[0] + nums[1] ==
                    9, we return [0, 1].
                  </pre>
                </div>
              </div>

              {/* Example 2 */}
              <div>
                <p className="font-medium text-white ">Example 2: </p>
                <div className="example-card bg-dark-layer-2 text-white rounded-md">
                  <pre>
                    <strong className="text-white">Input: </strong>nums =
                    [3,2,4], target = 6 <br />
                    <strong>Output: </strong>[1,2] <br />
                    <strong>Explanation: </strong>Because nums[1] + nums[2] ==
                    6, we return [1, 2].
                  </pre>
                </div>
              </div>
              {/* Example 3 */}
              <div>
                <p className="font-medium text-white ">Example 3: </p>
                <div className="example-card bg-dark-layer-2 text-white rounded-md">
                  <pre>
                    <strong className="text-white">Input: </strong>nums = [3,3],
                    target = 6
                    <br />
                    <strong>Output: </strong>[0,1] <br />
                  </pre>
                </div>
              </div>
            </div>

            {/* Constraints */}
            <div className="my-5">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <ul className="text-white ml-5 list-disc">
                <li className="mt-2">
                  <code>2 ≤ nums.length ≤ 10</code>
                </li>

                <li className="mt-2">
                  <code>-10 ≤ nums[i] ≤ 10</code>
                </li>
                <li className="mt-2">
                  <code>-10 ≤ target ≤ 10</code>
                </li>
                <li className="mt-2 text-sm">
                  <strong>Only one valid answer exists.</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Problem;
