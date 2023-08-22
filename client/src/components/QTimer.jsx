import React from "react";
import { useTimer } from "react-timer-hook";

export default function QTimer({ expiryTimestamp }) {
  const { seconds, minutes, isRunning } = useTimer({
    expiryTimestamp,
    autoStart: true,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className="rounded-md bg-dark-layer-2 flex gap-3 text-white items-center px-2">
      <div className="text-white">
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
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className=" pt-[2px] text-white text-sm font-semibold">
        <span>{("0" + minutes).slice(-2)}</span> :{" "}
        <span>{("0" + seconds).slice(-2)}</span>
      </div>
    </div>
  );
}
