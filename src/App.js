import './App.css';
import Login from './components/login/Login'
import Home from './components/Home/Home'
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Maps from './pages/Maps/Maps';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
            <ul>
              <li>
                <Link to='maps'>
                  maps
                </Link>
              </li>
              <li>
                <Link to='login'>
                  login
                </Link>
              </li>
            </ul>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/maps/*' element={<Maps/>} />
              <Route path='/login' element={<Login />} />
            </Routes>
        </header>
      </div>
    </BrowserRouter>

  );
}

export default App;
