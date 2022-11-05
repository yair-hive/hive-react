import { Routes, Route } from "react-router-dom";
import Map_test from "../Map_test/Map_test";

function Maps(){
    return (
        <Routes>
            <Route path="/:map_name" element={<Map_test />}/>
        </Routes>
    )
}

export default Maps