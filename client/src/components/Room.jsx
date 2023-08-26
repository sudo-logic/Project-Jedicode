import React, { useEffect, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { initSocket } from "../toBeShifted/socket";
import ACTIONS from "../toBeShifted/actions";
import { useSnapshot } from "valtio";
import { globalState } from "../utils/proxy";
import { useProxy } from "valtio/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvitePlayers from "./InvitePlayers";
import ModalIconActionButtons from "./EndTestButton";
import axios from "axios";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";

export const Room = () => {
  const state = useSnapshot(globalState);
  const $state = useProxy(globalState, { sync: true });
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  const [username, setUsername] = useState(state?.profile?.username);
  const isHost = state?.profile?.sub;
  const path = window.location.pathname.substring(1, 7);
  var test = true;
  if (path === "editor") {
    test = false;
  }

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: state.profile.username,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== state.profile.username) {
            // toast.success(`${username} joined the room.`);
            // console.log(`${username} joined`);
          }

          // make sure client whose username is same as profile username is always first in the array
          clients.sort((a, b) => {
            if (a.username === state.profile.username) {
              return -1;
            }
            if (b.username === state.profile.username) {
              return 1;
            }
            return 0;
          });

          setClients(clients);
          // console.log(state.room.started_at);
          axios
            .get(`/rooms/${roomId}`)
            .then((res) => {
              // console.log(res.data.started_at);
              $state.room.started_at = res.data.started_at;
              if (res.data.started_at) {
                reactNavigator(`/editor/${state.room.id}`);
              }
            })
            .catch((err) => {
              toast.error("Room not found! 😥");
              return;
            });
        }
      );

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        // toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };

    init();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, []);

  const startRoom = async (e) => {
    e.preventDefault();
    //   console.log(host);
    // redirecting to editor
    // if (host && host.socketId === clients[0].socketId) {

    await axios
      .put(`/rooms/${roomId}`, { started_at: new Date().toISOString() })
      .then((res) => {
        // console.log(res.started_at);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong! 😥");
      });

    await axios
      .get(`/rooms/${roomId}`)
      .then((res) => {
        // console.log(res.data.started_at);
        $state.room.started_at = res.data.started_at;
        if (res.data.started_at) {
          reactNavigator(`/editor/${state.room.id}`);
        }
      })
      .catch((err) => {
        toast.error("Room not found! 😥");
        return;
      });
  };

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }

  function leaveRoom() {
    reactNavigator("/");
  }

  return (
    <>
      {test ? (
        <>
          <div className=" grid gap-8 bg-white p-7 lg:grid-cols-2">
            {clients.map((user, index) => (
              <div
                key={user.socketId}
                className="-m-3 flex items-center rounded-md p-2 transition duration-150 ease-in-out hover:bg-gray-50 "
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-neutral-950 bg-gray-100 rounded-lg sm:h-12 sm:w-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-semibold text-neutral-950">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-500">{user.progress}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="m-4 flex justify-between">
            <InvitePlayers />
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 text-sm font-semibold bg-neutral-950 "
              onClick={startRoom}
              disabled={!(isHost == state.room.created_by.id)}
            >
              {isHost == state.room.created_by.id
                ? "Start!"
                : "Waiting for host to start!"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-full bg-dark-layer-2 p-2 text-base text-white  hover:text-opacity-100 focus:outline-none `}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        />
                      </svg>
                      <span className="absolute -top-1.5 left-7 inline-flex items-center justify-center gap-1 rounded-full  bg-dark-divider-border-2 px-[8px] py-[2px] text-xs text-white">
                        {clients.length}
                      </span>
                    </span>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-[27.5rem]  -translate-x-[92%] transform px-4">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                          {clients.map((user) => (
                            <div
                              key={user.socketId}
                              className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 "
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-neutral-950 bg-gray-100 rounded-lg sm:h-12 sm:w-12">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                  />
                                </svg>
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-semibold text-neutral-950">
                                  {user.username}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {user.progress}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="bg-gray-100 p-4">
                          <div className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out">
                            <span className="text-xl font-extrabold text-neutral-950">
                              Connected Jedi Knights
                            </span>

                            <span className="block text-sm text-gray-500">
                              Jedi Order: Knights sparring session
                            </span>
                          </div>
                          <div className="flex justify-between gap-4 h-10">
                            {/* <div
                              onClick={copyRoomId}
                              className="flex mt-4 gap-2 p-1 flex-1 items-center justify-center shrink-0 bg-white rounded-lg  cursor-pointer"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center  text-neutral-950 ">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                                  />
                                </svg>
                              </div>
                              <span className=" font-semibold text-sm text-neutral-950 pr-2">
                                Copy room ID
                              </span>
                            </div> */}
                            <ModalIconActionButtons />
                            <div
                              onClick={leaveRoom}
                              className="flex gap-1 p-1 flex-1 items-center justify-center shrink-0 bg-[#ee6969] rounded-lg  cursor-pointer"
                            >
                              <div className="flex  w-10 shrink-0 items-center justify-center  text-neutral-950 ">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                  />
                                </svg>
                              </div>
                              <span className=" font-semibold text-sm text-neutral-950 pr-2">
                                Leave the room
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </>
      )}
    </>
  );
};
