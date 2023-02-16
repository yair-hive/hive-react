import { useState } from "react"
import { useParams } from "react-router-dom"
import readXlsxFile from "read-excel-file"
import HiveButton from "../hive_elements/hive_button"
import PopUp from "../hive_elements/pop_up"
import api from "../scripts/api/api"

function ImportGuests(props){

    const {project_name} = useParams()

    const [file, setFile] = useState()

    function onChange(event){
        setFile(event.target.files[0])
    }

    function onClick(){
        readXlsxFile(file)
        .then((rows)=>{
            return api.guest_new.create_multi({project: project_name, data: rows})
        })
        .then(()=>{
            props.setState(false)
        })
    }

    return(<PopUp
        status={props.status} 
        setState = {props.setState}
        title = 'יבא'
    >
        <form id='import_guests_form'>
            <h2> ייבא בחורים </h2>
            <label> בחר קובץ אקסאל </label> 
            <br />
            <input onChange={onChange} type="file" accept=".xls,.xlsx" />
            <br />
            <HiveButton onClick={onClick}> ייבא </HiveButton>	
        </form>
    </PopUp>)
}

export default ImportGuests