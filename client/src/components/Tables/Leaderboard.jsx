import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    axios
      .get(`/users/leaderboard`)
      .then((response) => setLeaderboardData(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="  bg-[#212121] text-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-6">
        {/*  <!-- Body--> */}
        <header className="text-center pb-6">
          <h3 className="text-xl font-[700] text-white ">Leaderboard</h3>
        </header>

        <table
          className=" text-center border border-separate rounded overflow-y-scroll border-slate-200 shadow-md shadow-[#5656ff] w-full"
          cellSpacing="0"
        >
          <tbody>
            <tr>
              <th
                scope="col"
                className="h-12 px-2 text-sm font-bold border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200  break-words"
              >
                Rank
              </th>
              <th
                scope="col"
                className="h-12 px-3 text-sm font-bold border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200  break-words "
              >
                Name
              </th>
              <th
                scope="col"
                className="h-12 px-2 text-sm font-bold border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200  break-words"
              >
                Score
              </th>
            </tr>
            {leaderboardData.map((user, index) => (
              <tr
                key={user.id}
                className="transition-colors duration-300 hover:bg-dark-layer-2 bg-black"
              >
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100 break-words">
                  {index + 1}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100">
                  {user.username}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100 break-words">
                  {user.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Leaderboard;
