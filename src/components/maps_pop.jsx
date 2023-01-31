import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import HiveButton from '../hive_elements/hive_button';
import PopUp from '../hive_elements/pop_up';
import api from '../scripts/api/api';

function MapsPop(props){
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
    return (<PopUp 
        status={props.status} 
        setState = {props.setState}
        title = 'מפות'
    >
        <ul dir="rtl"> {getMapsList()} <HiveButton onClick={()=>{
            props.setAddMapPopStatus(true)
            props.setState(false)
        }}> הוסף מפה </HiveButton> </ul>
    </PopUp>)
}

export default MapsPop