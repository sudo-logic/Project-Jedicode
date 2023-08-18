import "./utils/axios";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Room from "./pages/Room";
import Workspace from "./pages/Workspace/Workspace";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import { useSnapshot } from "valtio";
import { globalState } from "./utils/proxy";

function App() {
  const state = useSnapshot(globalState);

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
      <ToastContainer />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor/:roomId" element={<Workspace />} />
      </Routes>
    </div>
  );
}

export default App;
