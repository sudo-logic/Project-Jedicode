import React from "react";

const Leaderboard = () => {
  return (
    <div className="w-full rounded">
      <h1 className="text-lg text-slate-100 tracking-widest text-center mb-2 font-starwars">
        Leaderboard Table
      </h1>

      <table
        className="w-full text-left border border-separate rounded overflow-y-auto border-slate-200 shadow-md shadow-[#5656ff]"
        cellSpacing="0"
      >
        <tbody>
          <tr>
            <th
              scope="col"
              className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200"
            >
              Rank
            </th>
            <th
              scope="col"
              className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200"
            >
              Name
            </th>
            <th
              scope="col"
              className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200"
            >
              Score
            </th>
          </tr>
          <tr className="transition-colors duration-300 hover:bg-slate-50 bg-black">
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100">
              1
            </td>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100">
              Michael Big
            </td>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100">
              1500
            </td>
          </tr>
          <tr className="transition-colors duration-300 hover:bg-slate-50 bg-black">
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100 ">
              2
            </td>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100 ">
              Mahesh
            </td>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100 ">
              1000
            </td>
          </tr>
          <tr className="transition-colors duration-300 hover:bg-slate-50 bg-black">
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100">
              3
            </td>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100">
              Beetlejuice
            </td>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100">
              500
            </td>
          </tr>
          <tr className="transition-colors duration-300 hover:bg-slate-50 bg-black">
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100 ">
              4
            </td>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100 ">
              Lambergamber
            </td>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100 ">
              250
            </td>
          </tr>
          <tr className="transition-colors duration-300 hover:bg-slate-50 bg-black">
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100">
              5
            </td>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100">
              Rahul Gandhi
            </td>
            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100">
              100
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
