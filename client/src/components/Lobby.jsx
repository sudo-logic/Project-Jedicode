import React from "react";
import { Room } from "./Room";
import { useLocation, Navigate } from "react-router-dom";

export default function Lobby() {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/" />;
  }

  function inviteMail() {}

  return (
    <>
      <div className="flex min-h-full items-center  justify-center p-4 text-center">
        <div className="w-full max-w-md transform  rounded-md bg-white  text-left align-middle  transition-all">
          <div className="bg-gray-100 rounded-md p-4">
            <div className="flow-root rounded-md px-2  py-2 transition duration-150 ease-in-out ">
              <span className="text-xl font-extrabold text-neutral-950 ">
                Connected Jedi Knights
              </span>

              <span className="block  text-sm text-neutral-500">
                Jedi Order: Knights sparring session
              </span>
            </div>
          </div>
          <Room />
        </div>
      </div>
    </>
  );
}
