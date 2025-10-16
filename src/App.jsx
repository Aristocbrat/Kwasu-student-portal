import { Routes, Route } from 'react-router-dom';
import Intro from './components/intro/Intro';
import Home from "./components/Home"
import Spdata from './components/profile/Spdata';
import Results from './components/profile/Results'
import './App.css';
import { useState } from 'react';
import { UserContext } from './components/UserContext';

function App() {
  const [username, setUsername] = useState("");
  return (
     <UserContext.Provider value={{ username, setUsername }}>
      <Routes>
        <Route path="/" element={<Intro />} />
         <Route path="/Home" element={<Home />} />
         <Route path="/spdata" element={<Spdata />} />
        <Route path="/Results" element={<Results />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
