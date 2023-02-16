import { useState } from "react"
import HiveButton from "../hive_elements/hive_button"
import PopUp from "../hive_elements/pop_up"
import api from "../scripts/api/api"
import { useNavigate } from "react-router-dom";

function AddProjectPop(props){

    const [name, setName] = useState('')
    const navigate = useNavigate()

    function onClick(){
        api.project.create({name: name})
    }

    return(
        <PopUp
        status={props.status} 
        setState = {props.setState}
        title = 'הוסף מפה'
        >
            <form id='create_map_form'>
                <label htmlFor="map_name"> שם המפה </label>
                <br />
                <input type='text' name='map_name' onInput={(e)=> setName(e.target.value)}/>  
                <br />
                <HiveButton onClick={onClick}> צור </HiveButton>
            </form>
        </PopUp>
    )
}

export default AddProjectPop