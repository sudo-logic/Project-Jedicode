import React from "react";
import { globalState } from "../../utils/proxy";
import { useProxy } from "valtio/utils";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";

const WarHistory = () => {
  // Keeping this here for now
  var special = [
    "zeroth",
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
    "eleventh",
    "twelfth",
    "thirteenth",
    "fourteenth",
    "fifteenth",
    "sixteenth",
    "seventeenth",
    "eighteenth",
    "nineteenth",
  ];
  var deca = [
    "twent",
    "thirt",
    "fort",
    "fift",
    "sixt",
    "sevent",
    "eight",
    "ninet",
  ];

  function stringifyNumber(n) {
    if (n < 20) return special[n];
    if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] + "ieth";
    return deca[Math.floor(n / 10) - 2] + "y-" + special[n % 10];
  }

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  const $state = useProxy(globalState, { sync: true });
  const [warHistory, setWarHistory] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (!$state.profile.sub) return;
    axios
      .get(`/users/past_wars/${$state.profile.sub}`)
      .then((res) => {
        // console.log(res.data);
        setWarHistory(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [$state.profile.sub]);

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    // <></>

    <div className="  bg-[#212121] text-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-6">
      <div className="w-full rounded pb-10">
        <header className="text-center pb-6">
          <h3 className="text-xl font-[700] text-white">Past Wars</h3>
        </header>
        <table
          className="w-full text-left border border-separate rounded overflow-y-auto border-slate-200 shadow-md shadow-[#00FF00]"
          cellSpacing="0"
        >
          <tbody>
            <tr>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200"
              >
                Index
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200"
              >
                Room ID
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200"
              >
                Creator
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200"
              >
                Played
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200"
              >
                Score
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-200"
              >
                Position
              </th>
            </tr>
            {warHistory.map((war, index) => (
              <tr
                key={war.id}
                className="cursor-pointer transition-colors duration-300 hover:bg-dark-layer-2 bg-black"
              >
                {/* index td */}
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500">
                  {index + 1}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500">
                  {war.id}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500">
                  {war.created_by.username}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500">
                  {timeSince(new Date(war.created_at))} ago
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500">
                  {
                    war.player_data.find(
                      (player) => player.user_id === $state.profile.sub
                    ).score
                  }
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-400 stroke-slate-500">
                  {/* {war.player_data
                    .sort((a, b) => b.score - a.score)
                    .findIndex(
                      (player) => player.user_id === $state.profile.sub
                    ) + 1}{" "}
                  / {war.player_data.length} */}
                  {stringifyNumber(
                    war.player_data
                      .sort((a, b) => b.score - a.score)
                      .findIndex(
                        (player) => player.user_id === $state.profile.sub
                      ) + 1
                  )
                    .charAt(0)
                    .toUpperCase() +
                    stringifyNumber(
                      war.player_data
                        .sort((a, b) => b.score - a.score)
                        .findIndex(
                          (player) => player.user_id === $state.profile.sub
                        ) + 1
                    ).slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarHistory;
