import React from 'react'
import CreateRoom from "./CreateRoom"
import JoinRoom from './JoinRoom';

const CustomizeWar = () => {
  return (
    <div className="h-fit relative shadow-inner shadow-black rounded-md flex flex-row justify-center items-stretch gap-20 text-white font-sans">
      <CreateRoom />
      <JoinRoom />
    </div>
  );
}

export default CustomizeWar