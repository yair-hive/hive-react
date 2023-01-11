import Login from '../pages/login'
import Home from '../pages/home'
import Maps from '../pages/maps'
import Guests from '../pages/guests';

import { Routes, Route, } from "react-router-dom";
import MapContainer from '../edit_map/map_container';

function MainBord(){
    return (
        <div className='main_bord'>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/maps/:map_name/*' element={<MapContainer/>} />
                <Route path='/maps/:map_name/:edit' element={<MapContainer/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/guests/*' element={<Guests/>} />
            </Routes>
        </div>
    )
}

export default MainBord