import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Room from "./pages/Room"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/editor/:roomId" element={<Room />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
