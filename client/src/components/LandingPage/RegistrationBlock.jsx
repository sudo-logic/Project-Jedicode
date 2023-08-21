import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSnapshot } from "valtio";
import { globalState } from "../../utils/proxy";
import { updateProfile } from "../../utils/proxy";

const RegistrationBlock = () => {
  const state = useSnapshot(globalState);
  const URI = state.apiURI;

  const navigate = useNavigate();

  function Login() {
    const notify = () =>
      toast.error("Login Error: Please Check Your Username and Password");

    const [loginCreds, setLoginCreds] = useState({
      username: "",
      password: "",
    });

    const handleLoginForm = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setLoginCreds((values) => ({ ...values, [name]: value }));
    };

    const [POSTload, setPOSTload] = useState(false);
    const handleSubmit = (e) => {
      e.preventDefault();
      setPOSTload(true);

      axios
        .post(`/auth/login`, loginCreds)
        .then((res) => {
          localStorage.setItem("token", res.data.access_token);
          updateProfile();
          navigate("/dashboard");
        })
        .catch((err) => {
          notify();
          setPOSTload(false);
        });
    };

    return (
      <>
        <form className="flex flex-col gap-8 mb-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              id="id-b01"
              type="text"
              name="username"
              value={loginCreds.username}
              onChange={handleLoginForm}
              required="true"
              placeholder="Enter username"
              className="relative text-md w-96 h-10 px-4 placeholder-transparent transition-all border-b border-slate-200 outline-none focus-visible:outline-none peer text-slate-200 focus:border-[#FFDF00] focus:border focus:outline-none disabled:text-slate-400 bg-black autofill:bg-black"
              autoComplete="username"
            />
            <label
              htmlFor="id-b01"
              className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-black before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm -required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FFDF00] "
            >
              Enter your username
            </label>
          </div>
          <div className="relative">
            <input
              id="id-b02"
              type="password"
              name="password"
              value={loginCreds.password}
              onChange={handleLoginForm}
              required="true"
              placeholder="Enter username"
              className="relative text-md w-96 h-10 px-4 placeholder-transparent transition-all border-b border-slate-200 outline-none focus-visible:outline-none peer text-slate-200 focus:border-[#FFDF00] focus:border focus:outline-none disabled:text-slate-400 bg-black autofill:bg-black"
              autoComplete="current-password"
            />
            <label
              htmlFor="id-b02"
              className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-black before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm -required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FFDF00] "
            >
              Enter your password
            </label>
          </div>
          <p
            className="text-sm text-slate-300 self-end cursor-pointer transition-colors duration-200 -mt-5 hover:text-slate-50"
            onClick={handleSignupClick}
          >
            Don't have an account?{" "}
            <span className="font-bold">Create one!</span>
          </p>
          {POSTload ? (
            <div
              type="submit"
              className="p-2 px-3 rounded-md text-black bg-[#FFDF00] text-center"
            >
              Logging in...
            </div>
          ) : (
            <button
              type="submit"
              className="border border-[#FFDF00] p-2 px-3 rounded-md text-white transition-all duration-200 hover:text-black hover:bg-[#FFDF00] focus:text-black focus:bg-[#FFDF00]"
            >
              LOGIN
            </button>
          )}
        </form>
      </>
    );
  }

  function Signup() {
    const [signupCreds, setSignupCreds] = useState({
      username: "",
      email: "",
      password: "",
    });

    const handleSignupForm = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setSignupCreds((values) => ({ ...values, [name]: value }));
    };

    const [POSTload, setPOSTload] = useState(false);
    const handleSubmit = (e) => {
      e.preventDefault();
      setPOSTload(true);
      axios
        .post(`/auth/signup`, signupCreds)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.access_token);
          updateProfile();
          navigate("/dashboard");
        })
        .catch((err) => {
          setPOSTload(false);
          console.log(err);
          for (let i = 0; i < err.response.data.message.length; i++) {
            toast.error(err.response.data.message[i]);
          }
        });
    };

    return (
      <>
        <form className="flex flex-col gap-8 mb-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              id="id-b03"
              type="text"
              name="username"
              value={signupCreds.username}
              onChange={handleSignupForm}
              placeholder="Enter username"
              className="relative text-md w-96 h-10 px-4 placeholder-transparent transition-all border-b border-slate-200 outline-none focus-visible:outline-none peer text-slate-200 focus:border-[#FFDF00] focus:border focus:outline-none disabled:text-slate-400 bg-black"
            />
            <label
              htmlFor="id-b03"
              className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-black before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm -required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FFDF00] "
            >
              Enter your username
            </label>
          </div>
          <div className="relative">
            <input
              id="id-b02"
              type="email"
              name="email"
              value={signupCreds.email}
              onChange={handleSignupForm}
              placeholder="Enter your email id"
              className="relative text-md w-96 h-10 px-4 placeholder-transparent transition-all border-b border-slate-200 outline-none focus-visible:outline-none peer text-slate-200 focus:border-[#FFDF00] focus:border focus:outline-none disabled:text-slate-400 bg-black"
            />
            <label
              htmlFor="id-b02"
              className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-black before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm -required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FFDF00] "
            >
              Enter your email id
            </label>
          </div>
          <div className="relative">
            <input
              id="id-b02"
              type="password"
              name="password"
              value={signupCreds.password}
              onChange={handleSignupForm}
              placeholder="Enter your password"
              className="relative text-md w-96 h-10 px-4 placeholder-transparent transition-all border-b border-slate-200 outline-none focus-visible:outline-none peer text-slate-200 focus:border-[#FFDF00] focus:border focus:outline-none disabled:text-slate-400 bg-black"
            />
            <label
              htmlFor="id-b02"
              className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-black before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm -required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FFDF00] "
            >
              Enter your password
            </label>
          </div>
          <p
            className="text-sm text-slate-300 self-end cursor-pointer transition-colors duration-200 -mt-5 hover:text-slate-50"
            onClick={handleLoginClick}
          >
            Already have an account?{" "}
            <span className="font-bold">Login here!</span>
          </p>
          {POSTload ? (
            <div
              type="submit"
              className="p-2 px-3 rounded-md text-black bg-[#FFDF00] text-center"
            >
              Signing in...
            </div>
          ) : (
            <button
              type="submit"
              className="border border-[#FFDF00] p-2 px-3 rounded-md text-white transition-all duration-200 hover:text-black hover:bg-[#FFDF00] focus:text-black focus:bg-[#FFDF00]"
            >
              SIGNUP
            </button>
          )}
        </form>
      </>
    );
  }

  const [login, setLogin] = useState(<Login />);

  function handleLoginClick() {
    setLogin(<Login />);
  }

  function handleSignupClick() {
    setLogin(<Signup />);
  }

  return (
    <div>
      <div className="p-5 bg-[rgb(0,0,0)] flex flex-col justify-center items-center gap-8 rounded-md relative z-20 shadow-[0_0_20px_#126FE0] border border-slate-200">
        <div className="flex flex-row text-white w-full justify-center gap-4 items-center">
          <h1 className="text-2xl">MAY THE FORCE BE WITH YOU</h1>
        </div>
        {login}
      </div>
    </div>
  );
};

export default RegistrationBlock;
