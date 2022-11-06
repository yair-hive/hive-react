import { Routes, Route } from "react-router-dom";
import Maps_list from "../../components/Maps_list/Maps_list";
import Map_test from "C:/apps/hive-react/src/components/Map_test/Map_test.jsx"

function Maps(){
    return (
        <Routes>
            <Route path="/" element={<Maps_list />} />
            <Route path="/:map_name" element={<Map_test />}/>
        </Routes>
    )
}

export default Maps