import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Tables/Leaderboard";
import ResultTable from "../components/Tables/ResultTable";
import { useParams } from "react-router-dom";
import axios from "axios";
import IntermediateResult from "./IntermediateResult";

const Results = () => {
  const { roomId } = useParams();

  const [data, setData] = useState();

  const fetchApi = async () => {
    await axios
      .get(`/rooms/${roomId}`)
      .then((res) => {
        console.log("Result me room", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong! 😥");
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-10 grid grid-cols-4 justify-center items-start gap-16 h-full bg-black">
        {/* war options */}

        {data?.completed_at !== null ? (
          <div className="col-span-3">
            <ResultTable />
          </div>
        ) : (
          <div className="col-span-3">
            <IntermediateResult />
          </div>
        )}

        {/* leaderboard and war history */}
        <div className="grid grid-rows-1 flex-col justify-center content-center gap-5">
          <div className="">
            <Leaderboard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
