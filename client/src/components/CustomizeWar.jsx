import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { globalState } from "../utils/proxy";
import { useProxy } from "valtio/utils";
import axios from "axios";

export default function CustomizeWar() {
  const state = useSnapshot(globalState);
  const $state = useProxy(globalState, { sync: true });

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState(
    state?.profile?.username || "Loading..."
  );
  const [duration, setDuration] = useState(30);
  const [questionLimit, setQuestionLimit] = useState(3);
  const [createdRoom, setCreatedRoom] = useState(false);

  const questionArray = [2, 3, 4, 5];
  const durationArray = [15, 30, 45, 60, 90, 120];

  const navigate = useNavigate();

  //join the room
  const joinRoom = async (e) => {
    if (e) e.preventDefault();

    if (!state.profile.username || !roomId) {
      toast.error("Room ID is required! 😥");
      return;
    }

    $state.room = await axios
      .get(`/rooms/${roomId}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        toast.error("Room not found! 😥");
        return;
      });

    if (!state.room) {
      toast.error("Room not found! 😥");
      return;
    }

    $state.room.created_at = null;

    await axios
      .post(`/rooms/${roomId}/join`)
      .then((res) => {
        navigate(`/lobby/${$state.room.id}`, {
          state: { username: state.profile.username },
        });
      })
      .catch((err) => {
        toast.error("Error joining room! 😥");
        return;
      });
  };

  // create a new room
  const createNewRoom = (e) => {
    e.preventDefault();
    const room = axios
      .post(`/rooms`, {
        count: questionLimit,
        duration,
      })
      .then((res) => {
        setRoomId(res.data.id);
        setCreatedRoom(true);
        toast("Room created! ✦");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong! 😥");
      });
  };

  const handleInputEnter = async (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  useEffect(() => {
    if (createdRoom) joinRoom();
  }, [createdRoom]);

  return (
    <>
      <div className="h-fit relative shadow-inner shadow-black rounded-md flex flex-row justify-center items-stretch gap-20 text-white font-sans">
        <form className="overflow-hidden w-full bg-[#212121] text-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          {/*  <!-- Body--> */}
          <div className="p-6">
            <header className="text-center">
              <h3 className="text-xl font-[700] text-white">Create a room</h3>
            </header>
            {/*      <!-- Input field --> */}
            {/* <div className="relative my-6">
            <input
              id="name"
              type="text"
              readOnly={true}
              value={state.profile.username}
              onKeyUp={handleInputEnter}
              placeholder="your name"
              className="peer relative h-10 w-full rounded bg-[#212121] border border-neutral-200 px-4 pr-12 text-sm placeholder-transparent outline-none transition-all text-white autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-[#535353] disabled:text-white"
            />
            <label
              htmlFor="name"
              className="absolute left-2 -top-2 z-[1] px-2 text-xs text-neutral-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-[#212121] before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-neutral-400 peer-disabled:before:bg-transparent peer-disabled:px-2"
            >
              Name
            </label>

            <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-neutral-400 transition peer-invalid:text-pink-500">
              <span>Enter your name</span>
            </small>
          </div> */}
            <div className="flex flex-col">
              {/*      <!-- Input field --> */}
              {/* <div className="relative my-6">
              <input
                id="room"
                type="text"
                value={roomId}
                onKeyUp={handleInputEnter}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Room ID"
                className="peer relative h-10 w-full rounded border border-neutral-200 px-4 text-sm text-white placeholder-transparent bg-[#212121] outline-none transition-all autofill:bg-black invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400"
              />
              <label
                htmlFor="room"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-neutral-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-[#212121] before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:before:bg-transparent"
              >
                Room ID
              </label>
              <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-neutral-400 transition peer-invalid:text-pink-500">
                <span>Enter your Room ID</span>
              </small>
            </div> */}
            </div>
            <div className="flex flex-row gap-20 justify-center items-center">
              <div className="relative my-6 md:w-1/2">
                <select
                  id="id-11"
                  name="id-11"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  className="peer relative h-12 w-full appearance-none rounded border border-slate-200 bg-[#212121] px-4 text-neutral-400 outline-none transition-all autofill:bg-white focus:border-emerald-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                >
                  {durationArray.map((time, key) => (
                    <option key={key} value={time}>
                      {time} minutes
                    </option>
                  ))}
                  {/* <option value="" disabled selected></option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option> */}
                </select>
                <label
                  htmlFor="id-11"
                  className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base text-neutral-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-[#212121] before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Duration
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-3.5 right-2 h-5 w-5 fill-neutral-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-11 description-11"
                  role="graphics-symbol"
                >
                  <title id="title-11">Arrow Icon</title>
                  <desc id="description-11">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-neutral-400 transition">
                  <span>Duration of the competition</span>
                </small>
              </div>
              <div className="relative my-6 md:w-1/2">
                <select
                  id="id-11"
                  name="id-11"
                  required
                  value={questionLimit}
                  onChange={(e) => setQuestionLimit(e.target.value)}
                  className="peer relative h-12 w-full appearance-none rounded border border-slate-200 bg-[#212121] px-4 text-neutral-400 outline-none transition-all autofill:bg-white focus:border-emerald-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                >
                  {questionArray.map((question, key) => (
                    <option key={key} value={question}>
                      {question}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="id-11"
                  className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base text-neutral-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-[#212121] before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Questions limit
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-3.5 right-2 h-5 w-5 fill-neutral-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="title-11 description-11"
                  role="graphics-symbol"
                >
                  <title id="title-11">Arrow Icon</title>
                  <desc id="description-11">
                    Arrow icon of the select list.
                  </desc>
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-neutral-400 transition">
                  <span>Number of questions of the competition</span>
                </small>
              </div>
            </div>
          </div>
          {/*  <!-- Action base sized basic button --> */}
          <div className="flex flex-col justify-end px-6 pb-3">
            <button
              onClick={createNewRoom}
              className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-neutral-950 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:scale-[1.01] focus:bg-gray-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none"
            >
              <span>Create</span>
            </button>
          </div>
          {/* <div className=" text-xs px text-center mb-4">
          Wanna make your own room?&nbsp;
          <a onClick={createNewRoom} href="" className="text-white font-bold">
            Create Room
          </a>{" "}
        </div> */}
        </form>
        {/*<!-- End Card with form --> */}
        {/*<!-- Component: Card with form --> */}
        <form className="overflow-hidden w-2/5 bg-[#212121] text-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          {/*  <!-- Body--> */}
          <div className="p-6">
            <header className="text-center">
              <h3 className="text-xl font-[700] text-white">Join a room</h3>
            </header>
            {/*      <!-- Input field --> */}
            {/* <div className="relative my-6">
            <input
              id="name"
              type="text"
              readOnly={true}
              value={state.profile.username}
              onKeyUp={handleInputEnter}
              placeholder="your name"
              className="peer relative h-10 w-full rounded bg-[#212121] border border-neutral-200 px-4 pr-12 text-sm placeholder-transparent outline-none transition-all text-white autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-[#535353] disabled:text-white"
            />
            <label
              htmlFor="name"
              className="absolute left-2 -top-2 z-[1] px-2 text-xs text-neutral-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-[#212121] before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-neutral-400 peer-disabled:before:bg-transparent peer-disabled:px-2"
            >
              Name
            </label>

            <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-neutral-400 transition peer-invalid:text-pink-500">
              <span>Enter your name</span>
            </small>
          </div> */}
            <div className="flex flex-col">
              {/*      <!-- Input field --> */}
              <div className="relative my-6">
                <input
                  id="room"
                  type="text"
                  value={roomId}
                  onKeyUp={handleInputEnter}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Room ID"
                  className="peer relative h-10 w-full rounded border border-neutral-200 px-4 text-sm text-white placeholder-transparent bg-[#212121] outline-none transition-all autofill:bg-black invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400"
                />
                <label
                  htmlFor="room"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-neutral-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-[#212121] before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:before:bg-transparent"
                >
                  Room ID
                </label>
                <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-neutral-400 transition peer-invalid:text-pink-500">
                  <span>Enter your Room ID</span>
                </small>
              </div>
            </div>
          </div>
          {/*  <!-- Action base sized basic button --> */}
          <div className="flex flex-col justify-end px-6 pb-3">
            <button
              onClick={joinRoom}
              className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-neutral-950 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:scale-[1.01] focus:bg-gray-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none"
            >
              <span>Join</span>
            </button>
          </div>
        </form>
        {/*<!-- End Card with form --> */}
      </div>
    </>
  );
}
