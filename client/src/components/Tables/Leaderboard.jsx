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
    <div className="w-full rounded">
      <h1 className="text-lg text-slate-100 tracking-widest uppercase text-center mb-2 font-sans">
        Leaderboard Table
      </h1>

      <table
        className="w-full text-center border border-separate rounded overflow-y-auto border-slate-200 shadow-md shadow-[#5656ff]"
        cellSpacing="0"
      >
        <tbody>
          <tr>
            <th
              scope="col"
              className="h-12 px-6 text-sm font-bold border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200"
            >
              Rank
            </th>
            <th
              scope="col"
              className="h-12 px-6 text-sm font-bold border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200"
            >
              Name
            </th>
            <th
              scope="col"
              className="h-12 px-6 text-sm font-bold border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200"
            >
              Score
            </th>
          </tr>
          {leaderboardData.map((user, index) => (
            <tr
              key={user.id}
              className="transition-colors duration-300 hover:bg-dark-layer-2 bg-black"
            >
              <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100">
                {index + 1}
              </td>
              <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100">
                {user.username}
              </td>
              <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500 text-slate-100">
                {user.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
