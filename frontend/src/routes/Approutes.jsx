import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Result from '../pages/Result';

function Approutes() {
  return (
    <Routes>
      {/* Define each route as a child of <Routes> */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home/>} />
      <Route path='/search' element = {<Search/>}/>
      <Route path='/result' element={<Result/>}/>
    </Routes>
  );
}

export default Approutes;
