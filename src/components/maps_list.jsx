import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import api from "../scripts/api/api"
import HiveButton from "../hive_elements/hive_button"
import AddMapPop from "./add_map_pop"
import { useState } from "react"


function Maps_list(props){

    const [addMapPopStatus, setAddMapPopStatus] = useState(false)
    const  maps_res  = useQuery(['get_maps'], async ()=>{
        return await api.map.get_all()
    })
    function getMapsList(){
        if(maps_res.data){
            var maps_list = maps_res.data.data
            var maps_array = []
            var key = 0
            for(let map of maps_list){
                maps_array.push(<li key={key++}> <Link to={`/maps/${map.map_name}`} onClick={props.onMapClick}> {map.map_name} </Link></li>)
            }
            return maps_array
        }
        return 'טוען ...'
    }
    return (<>
    <ul dir="rtl"> {getMapsList()} <HiveButton onClick={()=>{
        setAddMapPopStatus(true)
        // props.onMapClick()
    }}> הוסף מפה </HiveButton> </ul>
    <AddMapPop status={addMapPopStatus} setState = {setAddMapPopStatus}/>
    </>)
}

export default Maps_list