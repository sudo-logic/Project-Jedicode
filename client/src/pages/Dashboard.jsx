import React from "react";
import Navbar from "../components/Navbar";
import CustomizeWar from "../components/CustomizeWar";
import Leaderboard from "../components/Tables/Leaderboard";
import WarHistory from "../components/Tables/WarHistory";
import { useEffect } from "react";
import { reset, updateProfile } from "../utils/proxy";

const Dashboard = () => {
  // useEffect(() => {
  //   updateProfile();
  // }, []);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 gap-4 p-8 h-full bg-black">
        {/* war options */}
        <div className="col-span-2 flex-col space-y-4">
          <CustomizeWar />
          <WarHistory />
        </div>
        <div className=" ">
          <Leaderboard />
        </div>

        {/* <div className="row-start-2 col-start-1 col-span-3 w-full h-2/3 bg-[url('./assets/dashboardBanner.jpg')] bg-cover rounded-md shadow-inner shadow-black -mt-16"></div> */}

        {/* leaderboard and war history */}
      </div>
    </>
  );
};

export default Dashboard;
