import React from "react";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Tables/Leaderboard";
import ResultTable from "../components/Tables/ResultTable";

const Results = () => {
  return (
    <>
      <Navbar />
      <div className="p-8 w-full flex justify-between gap-8 h-full bg-black">
        {/* war options */}
        <div className="basis-[70%]">
          <ResultTable />
        </div>

        {/* leaderboard and war history */}
        <div className="basis-[30%]">
          <Leaderboard />
        </div>
      </div>
    </>
  );
};

export default Results;
