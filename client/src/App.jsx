import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Room from "./pages/Room";
import Workspace from "./pages/Workspace/Workspace";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";

function App() {
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
