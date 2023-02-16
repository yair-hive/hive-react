import '../style/top_bar.css'
import { useQuery } from 'react-query'
import { Link } from "react-router-dom";
import api from '../scripts/api/api';
import { useState } from 'react';
import HiveButton from '../hive_elements/hive_button';
import MapsPop from '../components/maps_pop';
import AddMapPop from '../components/add_map_pop';
import AddProjectPop from '../components/add_project_pop';

function TopBar(){
    const [mapsPop, setMapsPop] = useState(false)
    const [addMapPopStatus, setAddMapPopStatus] = useState(false)
    const  user_res  = useQuery('get_user', async ()=>{
        return await api.user.get()
    })

    function get_user_name(){
        if(user_res.data) return user_res.data.data
        return 'לא מחובר'
    }

    return( 
        <div className='top_bar'>
            <div className="user_icon" >
                <Link to='login'>
                    <HiveButton>
                        {get_user_name()}       
                    </HiveButton>                
                </Link>
            </div>
            <ul>
                <li>
                    <HiveButton onClick={()=> setMapsPop(true)}> 
                        פרויקטים
                    </HiveButton>
                </li>
            </ul>
            <MapsPop status={mapsPop} setState = {setMapsPop} setAddMapPopStatus={setAddMapPopStatus}/>
            <AddProjectPop status={addMapPopStatus} setState = {setAddMapPopStatus}/>
        </div>
    )
}

export default TopBar