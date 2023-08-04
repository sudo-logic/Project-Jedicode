import React from "react";
import winner from "../assets/winner.svg";

const ResultTable = () => {
  return (
    <>
      <div clasName="overflow-y-auto mt-5 shadow-[0_0_20px] shadow-[#FFA500]">
        <table
          clasName="w-full text-left border border-collapse rounded sm:border-separate border-slate-200 "
          cellSpacing="0"
        >
          <tbody>
            <tr>
              <th
                scope="col"
                clasName="h-12 px-6 text-2xl font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100 p-3"
              >
                Criteria
              </th>
              <th
                scope="col"
                clasName="h-12 px-6 text-2xl font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100 p-3"
              >
                Player 1 Name
              </th>
              <th
                scope="col"
                clasName="h-12 px-6 text-2xl font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100 p-3"
              >
                Player 2 Name
              </th>
            </tr>
            <tr className="bg-black">
              <td clasName="h-12 px-6 text-xl transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-100  p-3">
                Time (in mins)
              </td>
              <td clasName="h-12 px-6 text-xl transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-100  p-3">
                23:00
              </td>
              <td clasName="h-12 px-6 text-xl transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-100  p-3">
                30:00
              </td>
            </tr>
            <tr className="bg-black">
              <td clasName="h-12 px-6 text-xl transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-100  p-3">
                No. of testcases passed
              </td>
              <td clasName="h-12 px-6 text-xl transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-100  p-3">
                25/30
              </td>
              <td clasName="h-12 px-6 text-xl transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-100  p-3">
                30/30
              </td>
            </tr>
            <tr className="bg-black">
              <td clasName="h-12 px-6 text-xl transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-100  p-3">
                Language used
              </td>
              <td clasName="h-12 px-6 text-xl transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-100  p-3">
                C++
              </td>
              <td clasName="h-12 px-6 text-xl transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-100  p-3">
                Python
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="  flex flex-row justify-center items-center gap-20">
        <img src={winner} className="w-80 mt-8 " />
        <h1 className="w-40 text-xl font-bold text-[#16a34a]">
          YOU WON!! LESSSGOOOOOOOOO!!!!
        </h1>
      </div>
    </>
  );
};

export default ResultTable;
