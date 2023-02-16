import { useState } from "react"
import HiveButton from "../hive_elements/hive_button"
import PopUp from "../hive_elements/pop_up"
import api from "../scripts/api/api"
import { useNavigate, useParams } from "react-router-dom";

function AddMapPop(props){

    const [name, setName] = useState('')
    const [rows, setRows] = useState(0)
    const [cols, setCols] = useState(0)
    const navigate = useNavigate()
    const {project_name} = useParams()

    function onClick(){
        api.map.create({
            map_name: name,
            rows_number: rows,
            columns_number: cols,
            project: project_name
        }).then(()=>{
            navigate(`/maps/${name}`)
        })
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
                <label htmlFor="rows_number"> מספר שורות </label>
                <br />
                <input type='text' name='rows_number' onInput={(e)=> setRows(e.target.value)}/>
                <br />
                <label htmlFor="columns_number"> מספר טורים </label>
                <br />
                <input type='text' name='columns_number' onInput={(e)=> setCols(e.target.value)}/> 
                <br /> 
                <HiveButton onClick={onClick}> צור </HiveButton>
            </form>
        </PopUp>
    )
}

export default AddMapPop