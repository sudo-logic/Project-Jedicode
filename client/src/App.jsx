import "./utils/axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Workspace from "./pages/Workspace/Workspace";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Lobby from "./components/Lobby";
import { ToastContainer } from "react-toastify";
import { useSnapshot } from "valtio";
import { globalState } from "./utils/proxy";
import useToken from "./utils/token";
import { useEffect } from "react";
import Results from "./pages/Results";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const state = useSnapshot(globalState);

  const navigate = useNavigate();

  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  // TODO:
  // jaha use karna ho
  // const state = useSnapshot(globalState)
  // kar dena and state.questions ya state.profile daal dena, toh data aajayega
  // since server is very fast, loader ki zarurat nahi padi but agar kahi edge case mila toh uss time global loader daal dege
  // PEACE ✌️

  // console.log(state?.questions)
  // console.log(state?.profile)

  return (
    <div className="w-screen h-screen bg-[url('./assets/background.jpg')]  text-neutral-400 overflow-x-hidden">
      <ToastContainer theme="dark" />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lobby/:roomId" element={<Lobby />} />
        <Route path="/editor/:roomId" element={<Workspace />} />
        <Route path="/result" element={<Results />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
