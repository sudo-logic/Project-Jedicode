import { React, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

function InvitePlayers() {
  const { roomId } = useParams();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };

  function sendMail() {
    isValidEmail
      ? toast("Mail has been sent!")
      : toast.error("Incorrect email address");
  }

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }

  return (
    <>
      <Popover className="relative rounded">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex justify-center rounded-md text-neutral-950 px-4 py-2 text-sm font-medium bg-gray-100 `}
            >
              <span className="font-semibold"> Invite knights</span>
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
                  <div className="bg-gray-100 p-2 flex justify-between items-center">
                    <div className="flow-root rounded-md p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none">
                      <span className=" font-bold flex items-center text-gray-900">
                        Invite via mail
                      </span>

                      <span className="block text-xs text-gray-500">
                        Send a link to join this session
                      </span>
                    </div>
                    <div
                      onClick={copyRoomId}
                      className="  items-center mr-2 justify-center shrink-0 bg-white rounded-lg cursor-pointer"
                    >
                      <div className="flex p-2 shrink-0 items-center justify-center  text-neutral-950 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 text-neutral-950">
                    <input
                      id="mail"
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={handleEmailChange}
                      className="peer relative h-10 w-full placeholder:text-sm rounded bg-white border border-neutral-200 px-2 text-sm outline-none transition-all"
                    />
                    <button onClick={sendMail}>
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
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
}

export default InvitePlayers;
