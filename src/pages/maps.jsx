import { Routes, Route } from "react-router-dom";
import Maps_list from "../components/maps_list";
import MapContainer from "../edit_map/map_container";

function Maps(){
    return (
        <Routes>
            <Route path="/" element={<Maps_list />} />
            <Route path="/:map_name" element={<MapContainer />}/>
        </Routes>
    )
}

export default Maps