import React, { useState } from "react";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { globalState } from "../utils/proxy";
import { useProxy } from "valtio/utils";

export default function CardForm() {
  const state = useSnapshot(globalState);
  const room = useProxy(globalState, { sync: true });
  const [username, setUsername] = useState(state?.profile?.username);
  const navigate = useNavigate();

  //join the room
  const joinRoom = (e) => {
    e.preventDefault();
    if (!room.roomId || !username) {
      toast.error("Room ID and username is required! ");
      return;
    }
    // redirecting to editor
    navigate(`/lobby/${room.roomId}`, {
      state: {
        username,
      },
    });
  };

  // create a new room
  const createNewRoom = (e) => {
    e.preventDefault();
    room.roomId = v4();
    room.started = false;
    toast("Room created! ✦");
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <>
      {/*<!-- Component: Card with form --> */}
      <form className="overflow-hidden w-full bg-[#212121] text-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="text-center">
            <h3 className="text-xl font-[700] text-white">Join a room</h3>
          </header>
          <div className="flex flex-col space-y-8">
            {/*      <!-- Input field --> */}
            <div className="relative my-6">
              <input
                id="room"
                type="text"
                value={room.roomId}
                onKeyUp={handleInputEnter}
                onChange={(e) => (room.roomId = e.target.value)}
                placeholder="Room ID"
                className="peer relative h-10 w-full rounded border border-neutral-200 px-4 text-sm text-white placeholder-transparent bg-[#212121] outline-none transition-all autofill:bg-black invalid:border-pink-500 invalid:text-pink-500 focus:border-gray-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400"
              />
              <label
                htmlFor="room"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-neutral-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-[#212121] before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:before:bg-transparent"
              >
                Room ID
              </label>
              <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-neutral-400 transition peer-invalid:text-pink-500">
                <span>Enter your Room ID</span>
              </small>
            </div>
            {/*      <!-- Input field --> */}
            <div className="relative my-6">
              <input
                id="name"
                type="text"
                value={username}
                onKeyUp={handleInputEnter}
                disabled
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your name"
                className="peer relative h-10 w-full rounded bg-[#212121] border border-neutral-200 px-4 pr-12 text-sm placeholder-transparent outline-none transition-all text-white autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-gray-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-[#535353] disabled:text-white"
              />
              <label
                htmlFor="name"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-neutral-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-[#212121] before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-neutral-400 peer-disabled:before:bg-transparent peer-disabled:px-2"
              >
                Name
              </label>

              <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-neutral-400 transition peer-invalid:text-pink-500">
                <span>Enter your name</span>
              </small>
            </div>
          </div>
        </div>
        {/*  <!-- Action base sized basic button --> */}
        <div className="flex flex-col justify-end p-6 ">
          <button
            onClick={joinRoom}
            className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-neutral-950 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:scale-[1.01] focus:bg-gray-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none"
          >
            <span>Join</span>
          </button>
        </div>
        <div className=" text-xs px text-center mb-4">
          Wanna make your own room?&nbsp;
          <a onClick={createNewRoom} href="" className="text-white font-bold">
            Create Room
          </a>{" "}
        </div>
      </form>
      {/*<!-- End Card with form --> */}
      <ToastContainer theme="dark" />
    </>
  );
}
