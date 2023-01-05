import Login from '../pages/login'
import Home from '../components/Home/Home'
import Maps from '../pages/Maps/Maps'
import { Routes, Route, } from "react-router-dom";;

function MainBord(){
    return (
        <div className='main_bord'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/maps/*' element={<Maps/>} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </div>
    )
}

export default MainBord