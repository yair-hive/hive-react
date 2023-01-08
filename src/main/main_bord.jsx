import Login from '../pages/login'
import Home from '../pages/home'
import Maps from '../pages/maps'
import Guests from '../pages/guests';

import { Routes, Route, } from "react-router-dom";

function MainBord(){
    return (
        <div className='main_bord'>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/maps/*' element={<Maps/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/guests/*' element={<Guests/>} />
            </Routes>
        </div>
    )
}

export default MainBord