import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./component/Login.jsx"; // Adjusted path for clarity
import Profile from './component/Profile/Profile.jsx';
import Header from './component/Profile/header.jsx';
import Rate from './component/rate/Rate.jsx';

// Import additional components as needed

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/other" element={<Rate/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
