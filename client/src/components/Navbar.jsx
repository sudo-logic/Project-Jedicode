import React, { useState } from "react";
import Logo from "../assets/jedicode-white.svg";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoExitOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useSnapshot } from "valtio";
import { globalState } from "../utils/proxy";

export default function Navbar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const state = useSnapshot(globalState);
  // console.log(state?.profile)
  const [username, setUsername] = useState(state?.profile?.username || "");

  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  function ProfileOverlay() {
    const navigate = useNavigate();

    return (
      <>
        {/*<!-- Component: User profile card --> */}
        {isProfileOpen ? (
          <div className="absolute overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200 right-3 top-3 z-10">
            {/*  <!-- Image --> */}
            <figure className="p-6 pb-0 relative">
              <span
                className="absolute right-4 top-4 cursor-pointer hover:bg-gray-300 transition-colors duration-200"
                onClick={() => setIsProfileOpen(false)}
              >
                <AiOutlineClose size={24} />
              </span>
              <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="black"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
            </figure>
            {/*  <!-- Body--> */}
            {load ? (
              <h1>Loading...</h1>
            ) : (
              <div className="p-6">
                <header className="mb-4">
                  <h3 className="text-xl font-medium text-slate-700">
                    {username}
                  </h3>
                </header>
              </div>
            )}
            {/*  <!-- Action base sized with lead icon buttons  --> */}
            <div className="flex justify-end gap-2 p-6 pt-0">
              <button
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded bg-gray-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-gray-600 focus:bg-gray-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none"
                onClick={() => {
                  // FIXME: clear proxy
                  navigate("/");
                  localStorage.clear("token");
                  toast.success("Logout Success");
                }}
              >
                <span className="order-2">Log Out</span>
                <IoExitOutline size={24} />
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {/*<!-- End User profile card --> */}
      </>
    );
  }

  return (
    <>
      {/*<!-- Component: Navbar with Avatar --> */}
      {/*<!-- Header --> */}
      <header className="border-b-1 relative z-20 w-full border-b border-slate-200 shadow-[0_0_20px#FF00FF] bg-black after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-24">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <div className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1">
              <img
                src={Logo}
                className="w-44 cursor-pointer transition-shadow duration-100 hover:shadow-sm hover:shadow-gray-300"
                onClick={() => navigate("/")}
              />
            </div>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                  : ""
              }
            `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>

            <ProfileOverlay />
            <div
              className="ml-auto flex cursor-pointer gap-2 items-center lg:ml-0 lg:p-0"
              onClick={() => setIsProfileOpen(true)}
            >
              {/*        <!-- Avatar --> */}
              <div
                className="flex flex-row items-center cusor-pointer"
                onClick={() => setIsProfileOpen(true)}
              >
                <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-8 h-8 max-w-full rounded-full "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-white">{username}</h3>
              </div>
              {/*        <!-- End Avatar --> */}
            </div>
          </nav>
        </div>
      </header>
      {/*<!-- End Navbar with Avatar--> */}
    </>
  );
}
