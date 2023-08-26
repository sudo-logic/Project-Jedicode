import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { globalState } from "../../utils/proxy";
import axios from "axios";
import { useProxy } from "valtio/utils";
// import winner from "../assets/winner.svg";

const ResultTable = () => {
  const [data, setData] = useState();
  const [load, setLoad] = useState(true);
  const [userId, setUserId] = useState([]);

  const state = useSnapshot(globalState);
  const $state = useProxy(globalState, { sync: true });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/rooms/${$state.room.id}`)
      .then((response) => {
        response.data.player_data
        setData(response.data.player_data);
        // console.log(response.data.player_data);
      })
      // .then(() => {
      //   for(let i = 0; i<data?.length; i++) {
      //     fetch(`${state.apiURI}/users/${data[i]?.user_id}`)
      //       .then(response => response.json())
      //       .then(data => {
      //         console.log("Ab dekh yaha se", data)
      //         setUserId([...userId, data])
      //         console.log(userId)
      //       })
      //       .catch(err => console.log("Profile fetch error: ", err))
      //   }
      // })
      .catch((err) => console.log("Fetch result error", err));
  }, []);

  useEffect(() => {
    for (let i = 0; i < data?.length; i++) {
      axios
        .get(`/users/${data[i]?.user_id}`)
        .then((response) => {
          setUserId((prev) => [...prev, response.data.username]);
        })
        .catch((err) => console.log("Profile fetch error: ", err));
    }
    setLoad(false)
    // console.log(data)
  }, [data]);
  
  return (
    <>
      {load ? (
        <h1>Loading Results...</h1>
      ) : (
        <div className="grid grid-cols-2 rounded-md bg-slate-800">
          {/* <div className="w-full col-span-3 text-left border-4 border-collapse rounded-md sm:border-separate border-slate-200 flex justify-between items-center bg-slate-100 overflow-y-auto mt-5"> */}
          <div className="h-12 px-6 text-2xl font-medium border-l border-b border-slate-600 text-slate-700 p-3 bg-white rounded-tl-md">
            Criteria
          </div>
          <div className="px-6 p-3 h-12 text-2xl border-b border-slate-400 rounded-tr-md">
            Score Obtained
          </div>
          {/* {userId?.map((user, key) => (
            <div key={key} className="h-12 px-6 text-2xl font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 p-3 bg-white">
              {user}
            </div>
          ))} */}
          {/* </div> */}
          {data?.map((user, key) => (
            <>
              <div
                key={key}
                className="h-12 px-6 text-2xl font-medium border-l first:border-l-0 text-slate-700 p-3 bg-white border-b border-slate-600"
              >
                {userId[key]}
              </div>
              <h4 key={key} className="px-6 py-3 border-b text-l border-slate-400">
                {user.score}
              </h4>
            </>
          ))}
          {/* <div className="  flex flex-row justify-center items-center gap-20">
          <img src={winner} className="w-80 mt-8 " />
          <h1 className="w-40 text-xl font-bold text-[#16a34a]">
            YOU WON!! LESSSGOOOOOOOOO!!!!
          </h1>
        </div> */}
        </div>
      )}
    </>
  );
};

export default ResultTable;
