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
import Projects from './pages/projects';
// import { useSocket } from './index.js';

const HiveContext = React.createContext({})

export function useHive(){
  return useContext(HiveContext)
}

export function useSocket(){
  return useContext(HiveSocket)
}

export const MBloaderContext = React.createContext(0)
export const EditContext = React.createContext('אל תערוך')
export const SelectablesContext = React.createContext(null)
export const ActionsContext = React.createContext(null)
export const BelongsContext = React.createContext(null)
export const GroupsContext = React.createContext(null)
export const TagsContext = React.createContext(null)

function App() {
  const hiveSocket = useSocket()
  const queryClient = useQueryClient()
  const MBloaderState = useState(0)
  const editState = useState('אל תערוך')
  const selecteblsState = useState('cell')
  const actionsState = useState('numbers')
  const belongsState = useState('הכל')
  const groupsState = useState('הכל')
  const tagsState = useState('הכל')
  const [popUps, setPopUps] = useState({})

  function openPopUp(id){
    setPopUps((prev) =>{
      var the_new = {...prev}
      the_new[id] = true
      return the_new
    })
  }
  function closePopUp(id){
    setPopUps((prev) =>{
      var the_new = {...prev}
      the_new[id] = false
      return the_new
    })
  }

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

  var hive = {
    pop_ups: popUps,
    openPopUp: openPopUp,
    closePopUp: closePopUp
  }


  return (
    <HiveContext.Provider value={hive}>
    <BelongsContext.Provider value={belongsState}>
    <GroupsContext.Provider value={groupsState}>
    <TagsContext.Provider value={tagsState}>
    <ActionsContext.Provider value={actionsState}>
    <EditContext.Provider value={editState}>
    <SelectablesContext.Provider value={selecteblsState}>
    <MBloaderContext.Provider value={MBloaderState}>
      <div className="content">
        <TopBar />
        <Routes>
          <Route path='/maps/:map_name/*' element ={<Maps />}/>
          <Route path='/guests/:project_name/*' element={<Guests/>} />
          <Route path='/projects/:project_name/*' element={<Projects />}/>
          <Route path='login' element={<Login/>} />
        </Routes>
      </div>
    </MBloaderContext.Provider>
    </SelectablesContext.Provider>
    </EditContext.Provider>
    </ActionsContext.Provider>
    </TagsContext.Provider>
    </GroupsContext.Provider>
    </BelongsContext.Provider>
    </HiveContext.Provider>
  );
}

export default App;
