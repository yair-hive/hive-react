import '../style/top_bar.css'
import { useQuery } from 'react-query'
import { Link } from "react-router-dom";
import api from '../scripts/api/api';
import { useState } from 'react';
import PopUp from '../hive_elements/pop_up';
import Maps_list from '../components/maps_list';
import HiveButton from '../hive_elements/hive_button';

function TopBar(){
    const [maps_pop_up_status, set_maps_pop_up_status] = useState(false)
    const  user_res  = useQuery('get_user', async ()=>{
        return await api.user.get()
    })

    function get_user_name(){
        if(user_res.data) return user_res.data.data
        return 'לא מחובר'
    }
    function open_maps_pop_up(){
        set_maps_pop_up_status(true)
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
                <li onClick={open_maps_pop_up}>
                    <HiveButton> 
                        מפות
                    </HiveButton>
                </li>
                {/* <li><Link to='maps'>maps</Link></li> */}
            </ul>
            <PopUp 
                status={maps_pop_up_status} 
                setState = {set_maps_pop_up_status}
                title = 'מפות'
            >
                <Maps_list onMapClick={()=> set_maps_pop_up_status(false)}/>
            </PopUp>
        </div>
    )
}

export default TopBar