import { Routes, Route, Link, useParams, } from "react-router-dom";
import HiveButton from "../hive_elements/hive_button";
import "../style/side_menu.css"

function MapSideMenu(){

    let {map_name} = useParams()

    return(<div className="sub_menu">
        <Link to={"/guests/"+map_name}><HiveButton>שמות</HiveButton></Link>
        <HiveButton> שבץ </HiveButton>
        <input type='text'></input>
    </div>)
}

function LoginSideMenu(){
    return null
}

function HomeSideMenu(){
    return null
}

function GuestsSideMenu(){

    let {map_name} = useParams()

    return(
        <div className="sub_menu">
        <Link to={`/maps/${map_name}`}>
            <HiveButton> חזור למפה </HiveButton>
        </Link>
        <HiveButton> הוסף בחורים </HiveButton>
        <HiveButton> ייבא בחורים </HiveButton>
        <HiveButton> קבוצות </HiveButton>
        <HiveButton> ייצא </HiveButton>
        </div>
    )
}

function SideMenu(){
    return(
        <div className="side_menu">
            <Routes>
                <Route path='/' element={<HomeSideMenu/>} />
                <Route path='/login' element={<LoginSideMenu/>} />
                <Route path='/maps/:map_name' element={<MapSideMenu/>} />
                <Route path='/guests/:map_name' element={<GuestsSideMenu/>} />
            </Routes>
        </div>
    )
}

export default SideMenu