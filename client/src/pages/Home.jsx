import React from "react";
import CreateRoom from "../components/CreateRoom";

const home = () => {
  return (
    <div className=" h-screen flex items-center justify-center">
      {/* bg-[#161616] bg-[url(src/assets/noise-light.png)] */}
      <CreateRoom />
      {/* <p className=" text-[#fff7e9] text-9xl font-[800]"> JEDICODE</p> */}
    </div>
  );
};

export default home;
