import './top_bar.css'
import { useQuery } from 'react-query'
import { Link } from "react-router-dom";
import api from '../scripts/api/api';

function TopBar(){
    const  user_res  = useQuery('get_user', async ()=>{
        return await api.user.get()
    })

    function get_user_name(){
        if(user_res.data) return user_res.data.data
        return 'לא מחובר'
    }

    return( 
        <div className='top_bar'>
            <div className="user_icon" ><Link to='login'>{get_user_name()}</Link></div>
            <ul>
                <li><Link to='maps'>maps</Link></li>
            </ul>
        </div>
    )
}

export default TopBar