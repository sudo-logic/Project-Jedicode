import React, { useEffect, useRef, useState } from "react";
import { Popover, Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSnapshot } from "valtio";
import { globalState } from "../utils/proxy";
import { initSocket } from "../toBeShifted/socket";
import ACTIONS from "../toBeShifted/actions";
import { ToastContainer, toast } from "react-toastify";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";

export default function Lobby() {
  const state = useSnapshot(globalState);
  const socketRef = useRef(null);
  const location = useLocation();
  const room = useSnapshot(globalState);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [username, setUsername] = useState(state?.profile?.username);
  const [clients, setClients] = useState([]);

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
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          setClients(clients);
        }
      );

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
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

  if (!location.state) {
    return <Navigate to="/" />;
  }

  function closeModal() {
    // setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const joinRoom = (e) => {
    e.preventDefault();
    // redirecting to editor
    navigate(`/editor/${room.roomId}`, {
      state: {
        username,
      },
    });
  };

  function inviteMail() {}

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#141416]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white  text-left align-middle  transition-all">
                  <Dialog.Title className="bg-gray-100 p-4">
                    <div className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out ">
                      <span className="text-lg font-extrabold text-neutral-950 ">
                        Connected Jedi Knights
                      </span>

                      <span className="block text-sm text-neutral-500">
                        <strong>Jedi Order:</strong> Knights sparring session
                      </span>
                    </div>
                  </Dialog.Title>

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
                          <p className="text-sm font-bold text-neutral-950">
                            {user.username}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user.progress}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="m-4 flex justify-between">
                    <Popover className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={` ${
                              open ? "" : "text-opacity-90"
                            } inline-flex justify-center rounded-md border border-transparent text-neutral-950 px-4 py-2 text-sm font-medium bg-gray-100 `}
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
                            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                              <div className="overflow-hidden rounded-lg ">
                                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                                  {solutions.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                    >
                                      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                        <item.icon aria-hidden="true" />
                                      </div>
                                      <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">
                                          {item.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          {item.description}
                                        </p>
                                      </div>
                                    </a>
                                  ))}
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
                    >
                      Ready!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
