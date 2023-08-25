import React from "react";
import Navbar from "../components/Navbar";
import CustomizeWar from "../components/CustomizeWar";
import Leaderboard from "../components/Tables/Leaderboard";
import WarHistory from "../components/Tables/WarHistory";
import { useEffect } from "react";
import { reset, updateProfile } from "../utils/proxy";

const Dashboard = () => {
  useEffect(() => {
    updateProfile();
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-full px-10 pt-10 grid grid-rows-2 grid-cols-4 justify-center items-start gap-x-16 bg-black">
        {/* war options */}
        <div className="row-start-1 row-span-1 col-span-3 mt-5">
          <CustomizeWar />
        </div>

        <div className="row-start-2 col-start-1 col-span-3 w-full h-2/3 bg-[url('./assets/dashboardBanner.jpg')] bg-cover rounded-md shadow-inner shadow-black -mt-16"></div>

        {/* leaderboard and war history */}
        <div className="grid col-start-4 flex-col justify-center content-center gap-5">
          <Leaderboard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
