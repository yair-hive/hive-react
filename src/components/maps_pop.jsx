import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import HiveButton from '../hive_elements/hive_button';
import PopUp from '../hive_elements/pop_up';
import api from '../scripts/api/api';

function MapsPop(props){
    const projects  = useQuery(['projects'], async ()=>{
        return await api.project.get()
    })
    function getMapsList(){
        if(projects.data){
            return projects.data.map((project, index)=>{
                return (<li key={index} onClick={()=> props.setState(false)}> 
                    <Link to={`/projects/${project.name}`} onClick={props.onMapClick}> 
                        {project.name} 
                    </Link>
                </li>)     
            })
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