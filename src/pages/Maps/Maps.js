import { Routes, Route } from "react-router-dom";
import Maps_list from "../../components/Maps_list/Maps_list";
import Map_cont from "../../components/Map_cont/Map_cont";

function Maps(){
    return (
        <Routes>
            <Route path="/" element={<Maps_list />} />
            <Route path="/:map_name" element={<Map_cont />}/>
        </Routes>
    )
}

export default Maps