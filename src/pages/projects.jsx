import { useEffect, useState } from "react"
import { Link, Route, Router, Routes, useNavigate, useParams } from "react-router-dom"
import AddMapPop from "../components/add_map_pop"
import Map from "../edit_map/map"
import MapSideMenu from "../edit_map/side_menu"
import GuestsTable from "../guests_list/guests_table"
import GuestsSideMenu from "../guests_list/side_menu"
import HiveButton from "../hive_elements/hive_button"
import HiveSwitch from "../hive_elements/hive_switch"
import { useMapsAllData } from "../querys/maps"
import ProjectSM from "./projects_sub_menu"

function Projects(){

    const navigate = useNavigate()
    const {map_name} = useParams()

    const [map, setMap] = useState(null)
    const maps = useMapsAllData()
    
    var mapsOptions = maps.data?.map(map => map.map_name)

    
    useEffect(()=> {if(map) navigate(`map/${map}`)}, [map])

    return(
        <>
        <div className="main_bord">
            <Routes>
                <Route path="map/:map_name" element={<Map />}/>
                <Route path="guest/:map_name" element={<GuestsTable />}/>
            </Routes>
        </div>
        <div className="side_menu">
            <HiveSwitch 
                options={mapsOptions} 
                active={map_name}
                setActive={setMap} 
                bordKey="KeyQ" 
            />
            <Routes>
                <Route path="map/:map_name" element={<><MapSideMenu /><ProjectSM /></>}/>
                <Route path="guest/:map_name" element={<GuestsSideMenu />}/>
            </Routes>
        </div>
        </>
    )
}

export default Projects