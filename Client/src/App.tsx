import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Authentication from './pages/Authentication/Authentication';
import { useAppSelector } from './state/hooks';
import RightPane from './components/RightPane/RightPane';
import Home from './pages/Home/Home';

const App = () => {
  const loggedIn = useAppSelector((state: any) => state.auth.loggedIn);
  const authChecker = loggedIn ? <Home /> : <Authentication />;
  return (
    <>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
