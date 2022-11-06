import './App.css';
import Login from './components/login/Login'
import Home from './components/Home/Home'
import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Maps from './pages/Maps/Maps';
import Nav_bar from './components/Nav_ber/Nav_bar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Nav_bar />
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/maps/*' element={<Maps/>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
