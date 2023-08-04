import React from "react";
import {AiOutlineClose} from "react-icons/ai";
import {CgProfile} from "react-icons/cg"
import {IoExitOutline} from "react-icons/ai";

function ProfileOverlay() {
  return (
    <>
      {/*<!-- Component: User profile card --> */}
      <div className="absolute overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200 right-3 top-3 z-10">
        {/*  <!-- Image --> */}
        <figure className="p-6 pb-0 relative">
          <span className="absolute right-4 top-4"><AiOutlineClose size={24}/></span>
          <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full text-white">
            <img
              src="https://i.pravatar.cc/80?img=22"
              alt="user name"
              title="user name"
              width="80"
              height="80"
              className="max-w-full rounded-full"
            />
          </span>
        </figure>
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="mb-4">
            <h3 className="text-xl font-medium text-slate-700">
              Nichole Jones
            </h3>
            <p className=" text-slate-400">Senior Designer</p>
          </header>
        </div>
        {/*  <!-- Action base sized with lead icon buttons  --> */}
        <div className="flex justify-end gap-2 p-6 pt-0">
          <button className="inline-flex h-10 flex-1 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-gray-50 px-5 text-sm font-medium tracking-wide text-gray-500 transition duration-300 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-200 focus:text-gray-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none">
            <span className="order-2">My Profile</span>
            <CgProfile />
          </button>
          <button className="inline-flex h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded bg-gray-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-gray-600 focus:bg-gray-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none">
            <span className="order-2">Add friend</span>
            
          </button>
        </div>
      </div>
      {/*<!-- End User profile card --> */}
    </>
  );
}
