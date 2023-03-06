import { useContext, useState } from "react"
import { useQueryClient } from "react-query"
import { Link, useParams } from "react-router-dom"
import { MBloaderContext, useHive, useSocket } from "../app"
import AddMapPop from "../components/add_map_pop"
import HiveButton from "../hive_elements/hive_button"

function ProjectSM(){

    const {map_name, project_name} = useParams()

    const [MBstatus, setMBStatus] = useContext(MBloaderContext)

    const hiveSocket = useSocket()
    const queryClient = useQueryClient()
    const hive = useHive()

    function scheduling(){
        const source = new EventSource(`http://hive.com:3020/actions/scheduling/${project_name}`);

        source.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMBStatus(data.progress);
            if(data.progress == 100){
                queryClient.invalidateQueries(['belongs', map_name])
                var msg = JSON.stringify({action: 'invalidate', quert_key: ['belongs', map_name]})
                hiveSocket.send(msg)
                source.close()
                setMBStatus(0)
            }
        };

        source.onerror = (error) => {
            console.error('An error occurred:', error);
        };
    }

    return(
        <div className="sub_menu">
            <Link to={`/projects/${project_name}/guest/${map_name}`}><HiveButton>שמות</HiveButton></Link>
            <HiveButton onClick={scheduling}> שבץ </HiveButton>
            <HiveButton onClick={()=> hive.openPopUp('add_map')}> הוסף מפה </HiveButton>
            <AddMapPop id={'add_map'}/>
        </div>
    )
}

export default ProjectSM