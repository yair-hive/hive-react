import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import api from "../../scripts/api/api"


function Maps_list(){
    const  maps_res  = useQuery(['get_maps'], async ()=>{
        return await api.map.get_all()
    })
    function getMapsList(){
        if(maps_res.data){
            var maps_list = maps_res.data.data
            var maps_array = []
            var key = 0
            for(let map of maps_list){
                maps_array.push(<li key={key++}> <Link to={`/maps/${map.map_name}`}> {map.map_name} </Link></li>)
            }
            return maps_array
        }
        return 'טוען ...'
    }
    return <ul dir="rtl"> {getMapsList()} </ul>
}

export default Maps_list