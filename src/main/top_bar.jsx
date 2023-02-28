import '../style/top_bar.css'
import { Link } from "react-router-dom";
import HiveButton from '../hive_elements/hive_button';
import AddProjectPop from '../components/add_project_pop';
import { useHive } from '../app';
import ProjectsPop from '../components/projects_pop';

function TopBar(){

    function get_user_name(){ return 'לא מחובר'}
    const Hive = useHive()

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