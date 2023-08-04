import React from "react";
import Navbar from "../components/Navbar";
import CustomizeWar from "../components/CustomizeWar";
import Leaderboard from "../components/Tables/Leaderboard";
import WarHistory from "../components/Tables/WarHistory";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="p-10 grid grid-rows-2 grid-cols-4 justify-center items-start gap-x-16 h-full bg-black">
        
        <div className="row-start-1 col-span-3 w-full h-1/2 bg-[url('./assets/dashboardBanner.jpg')] bg-cover rounded-md shadow-inner shadow-black"></div>

        {/* war options */}
        <div className="row-start-2 col-span-3 -mt-28">
          <CustomizeWar />
        </div>

        {/* leaderboard and war history */}
        <div className="grid col-start-4 grid-rows-1 flex-col justify-center content-center gap-5">
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

export default Dashboard;
