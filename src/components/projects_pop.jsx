import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useHive } from '../app';
import HiveButton from '../hive_elements/hive_button';
import PopUp from '../hive_elements/pop_up';
import { useProjects } from '../querys';

function ProjectsPop({id}){

    const projects  = useProjects()
    const Hive = useHive()

    function onProjectClick(){
        Hive.closePopUp(id)
    }
    function onAddProject(){
        Hive.openPopUp('add_project')
        Hive.closePopUp(id)
    }

    function getProjectsList(){
        return projects.data?.map((project, index)=>{
            return (
                <li key={index} onClick={onProjectClick}> 
                    <Link to={`/projects/${project.name}`}> 
                        {project.name} 
                    </Link>
                </li>
            )     
        })
    }

    return (
        <PopUp id={id} title = 'פרויקטים' >
            <ul dir="rtl"> 
                {getProjectsList()} 
                <br />
                <HiveButton onClick={onAddProject}> הוסף פרויקט </HiveButton> 
            </ul>
        </PopUp>
    )
}

export default ProjectsPop