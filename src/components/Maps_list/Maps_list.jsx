import { get_maps } from "../../scripts/main"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"


function Maps_list(){
    const [maps, setMaps] = useState([])
    useEffect(()=>{})
    var maps_array = []
    get_maps().then((maps_list)=>{
        var key = 0
        for(let map of maps_list){
            maps_array.push(<li key={key++}> <Link to={`${map}`}> {map} </Link></li>)
        }
        setMaps(maps_array)
    })
    return <ul> {maps} </ul>
}

export default Maps_list