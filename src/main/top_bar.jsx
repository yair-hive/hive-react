import '../style/top_bar.css'
import { Link } from "react-router-dom";
import HiveButton from '../hive_elements/hive_button';
import AddProjectPop from '../components/add_project_pop';
import { useHive } from '../app';
import ProjectsPop from '../components/projects_pop';
import new_api from '../new_api/new_api';
import { useEffect, useState } from 'react';
import ActionsDrop from '../user_components/actions_drop';
import { useUserData } from '../querys/users';
import LoginPop from '../user_components/login_pop';
import SginupPop from '../user_components/sginup_pop';


function TopBar(){
    
    const user_name = useUserData()

    function get_user_name(){ 
        if(user_name.data) return user_name.data
        return 'לא מחובר'
    }
    const Hive = useHive()

    const [drop, setDrop] = useState(false)

    return( 
        <div className='top_bar'>
            <div className="user_icon" onMouseOver={()=> setDrop(true)} onMouseOut={()=> setDrop(false)}>
                    <div className = {`user_name ${drop ? 'active' : ''}`}>
                        {get_user_name()}       
                    </div>
                    <ActionsDrop drop={drop} setDrop={setDrop}/>               
            </div>
            <LoginPop id={'login'}/>
            <SginupPop id={'sginup'}/>
            <ul>
                <li>
                    <HiveButton onClick={()=> Hive.openPopUp('projects')}> 
                        פרויקטים
                    </HiveButton>
                </li>
            </ul>
            <ProjectsPop id={'projects'}/>
            <AddProjectPop id={'add_project'}/>
        </div>
    )
}

export default TopBar