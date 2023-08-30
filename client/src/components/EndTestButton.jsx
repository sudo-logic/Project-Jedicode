import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { globalState } from "../utils/proxy";
import { useProxy } from "valtio/utils";

export default function ModalIconActionButtons() {
  const $state = useProxy(globalState, { sync: true });

  const navigate = useNavigate();

  const [isShowing, setIsShowing] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowing(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    let html = document.querySelector("html");

    if (html) {
      if (isShowing && html) {
        html.style.overflowY = "hidden";

        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const modal = document.querySelector("#modal"); // select the modal by it's id

        const firstFocusableElement =
          modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal

        const focusableContent = modal.querySelectorAll(focusableElements);

        const lastFocusableElement =
          focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

        document.addEventListener("keydown", function (e) {
          if (e.keyCode === 27) {
            setIsShowing(false);
          }

          let isTabPressed = e.key === "Tab" || e.keyCode === 9;

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus(); // add focus for the last focusable element
              e.preventDefault();
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              // if focused has reached to last focusable element then focus first focusable element after pressing tab
              firstFocusableElement.focus(); // add focus for the first focusable element
              e.preventDefault();
            }
          }
        });

        firstFocusableElement.focus();
      } else {
        html.style.overflowY = "visible";
      }
    }
  }, [isShowing]);

  const handleRoomExit = () => {
    if($state.clients.length > 1) {
      navigate(`/intermediate-result`);
    }
    else {
      navigate(`/result/${$state.room.id}`);
    }
    toast.success("Test Ended. Thank you for choosing us :)");
  };

  return (
    <>
      <button
        onClick={() => setIsShowing(true)}
        className=" rounded-md px-3 py-2 font-semibold bg-yellow-500 text-black opacity-90 hover:opacity-100 transition-all"
      >
        <span>Submit Test</span>
      </button>

      {isShowing && typeof document !== "undefined"
        ? ReactDOM.createPortal(
            <div
              className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-5a content-5a"
              aria-modal="true"
              tabindex="-1"
              role="dialog"
            >
              {/*    <!-- Modal --> */}
              <div
                ref={wrapperRef}
                className="flex max-h-[90vh] max-w-xs flex-col gap-6 overflow-hidden rounded-md bg-black p-6 text-center text-slate-500 shadow-xl shadow-slate-700/10"
                id="modal"
                role="document"
              >
                {/*        <!-- Modal header --> */}
                <header
                  id="header-5a"
                  className="flex flex-col items-center gap-4"
                >
                  <h3 className="flex-1 text-xl font-medium text-slate-100">
                    Exit the competition?
                  </h3>
                </header>
                {/*        <!-- Modal body --> */}
                <div
                  id="content-5a"
                  className="flex-1 text-slate-300 overflow-auto"
                >
                  <p>After exiting the room, you cannot re-enter.</p>
                </div>
                {/*        <!-- Modal actions --> */}
                <div className="flex justify-start gap-2">
                  <button className="inline-flex items-center justify-center flex-1 h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                    <span onClick={() => setIsShowing(false)}>
                      Review your code
                    </span>
                  </button>
                  <button className="inline-flex items-center justify-center flex-1 h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded justify-self-center whitespace-nowrap text-emerald-500 hover:bg-emerald-900 hover:text-emerald-100 focus:bg-emerald-900 focus:text-emerald-100 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent">
                    <span onClick={handleRoomExit}>Exit</span>
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
