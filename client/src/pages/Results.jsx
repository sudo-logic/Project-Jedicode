import React from "react";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Leaderboard";
import WarHistory from "../components/WarHistory";
import ResultTable from "../components/ResultTable";

const Results = () => {
  return (
    <>
      <Navbar />
      <div className="p-10 grid grid-cols-4 justify-center items-start gap-16 h-full">
        {/* war options */}
        <div className="col-span-3">
          <ResultTable />
        </div>

        {/* leaderboard and war history */}
        <div className="grid grid-rows-1 flex-col justify-center content-center gap-5">
          <div className="">
            <Leaderboard />
          </div>
          <div className="row-span-1">
            <WarHistory />
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
