import React, { useEffect, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSnapshot } from "valtio";
import { globalState } from "../utils/proxy";
import { Room } from "./Room";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Navigate, useParams } from "react-router-dom";

export default function Lobby() {
  const state = useSnapshot(globalState);
  const room = useSnapshot(globalState);
  const navigate = useNavigate();
  const username = useState(state?.profile?.username);
  // const host = clients[0];

  const joinRoom = (e) => {
    //   e.preventDefault();
    //   console.log(host);
    //   // redirecting to editor
    //   if (host && host.socketId === clients[0].socketId) {
    //     navigate(`/editor/${room.roomId}`, {
    //       state: {
    //         username,
    //       },
    //     });
    //   }
  };

  function inviteMail() {}

  return (
    <>
      <div className="flex min-h-full items-center  justify-center p-4 text-center">
        <div className="w-full max-w-md transform  rounded-md bg-white  text-left align-middle  transition-all">
          <div className="bg-gray-100 rounded-md p-4">
            <div className="flow-root rounded-md px-2  py-2 transition duration-150 ease-in-out ">
              <span className="text-lg font-extrabold text-neutral-950 ">
                Connected Jedi Knights
              </span>

              <span className="block text-sm text-neutral-500">
                <strong>Jedi Order:</strong> Knights sparring session
              </span>
            </div>
          </div>
          <Room />

          <div className="m-4 flex justify-between">
            <Popover className="relative rounded">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex justify-center rounded-md text-neutral-950 px-4 py-2 text-sm font-medium bg-gray-100 `}
                  >
                    <span> Invite knights</span>
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
                    <Popover.Panel className="absolute left-1/2 z-20 mt-2 w-screen max-w-xs -translate-x-[90%] transform px-4 ">
                      <div className="overflow-hidden rounded-lg bg-white">
                        <div className="bg-gray-100 p-2 ">
                          <div className="flow-root rounded-md px-2 p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none">
                            <span className="flex items-center">
                              <span className=" font-bold text-gray-900">
                                Invite via mail
                              </span>
                            </span>
                            <span className="block text-xs text-gray-500">
                              Send a link to join this session
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 text-neutral-950">
                          <input
                            id="mail"
                            type="email"
                            placeholder="email@example.com"
                            className="peer relative h-10 w-full rounded bg-white border border-neutral-200 px-2  text-sm  outline-none transition-all "
                          ></input>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-10 h-10"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent text-white px-4 py-2 text-sm font-bold bg-neutral-950 "
              onClick={joinRoom}
              // disabled={host && host.socketId !== clients[0].socketId}
            >
              Ready!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
