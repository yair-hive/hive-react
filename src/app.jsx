import './style/app.css';
import TopBar from './main/top_bar';
import { Route, Routes } from 'react-router-dom';
import Maps from './pages/maps';
import Guests from './pages/guests';
import Login from './pages/login';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { HiveSocket } from '.';
// import { useSocket } from './index.js';

export function useSocket(){
  return useContext(HiveSocket)
}

export const MBloaderContext = React.createContext(0)

function App() {
  const hiveSocket = useSocket()
  const queryClient = useQueryClient()
  const MBloaderState = useState(0)
  useEffect(()=>{
    hiveSocket.onmessage = function(msg){
      var data = JSON.parse(msg.data)
      console.log(data)
      if(data.action == 'invalidate'){
        queryClient.invalidateQueries(data.query_key)
      }
    }
    hiveSocket.onerror = function(msg){
      console.log(msg)
    }
  }, [])

  useEffect(()=>{
    function onEnter(event){
      if(event.code == 'Enter'){
        document.activeElement.blur()
      }
    }
    document.addEventListener('keydown', onEnter)
    return ()=> document.removeEventListener('keydown', onEnter)
  }, [])
  return (
    <MBloaderContext.Provider value={MBloaderState}>
      <div className="content">
        <TopBar />
        <Routes>
          <Route path='/maps/:map_name/*' element ={<Maps />}/>
          <Route path='/guests/:map_name/*' element={<Guests/>} />
          <Route path='login' element={<Login/>} />
        </Routes>
      </div>
    </MBloaderContext.Provider>
  );
}

export default App;
