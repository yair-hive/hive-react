import { useEffect } from "react"
import { useState } from "react"
import { useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import { useSocket } from "../app"
import HiveButton from "../hive_elements/hive_button"
import PopUp from "../hive_elements/pop_up"
import { useGuestsCreate } from "../querys/guests"

function AddGuest(props){

    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [group, setGroup] = useState('')
    const create_guests = useGuestsCreate()

    function onClick(){
        create_guests([[first, last, group]])
        props.setState(false)
    }


    return(
        <PopUp
        status={props.status} 
        setState = {props.setState}
        title = 'הוסף'
    >
        <form id='add_guest_form'>
            <label htmlFor='first_name'> שם פרטי </label>
            <br /> 
            <input type='text' name='first_name' onInput={(e)=> setFirst(e.target.value)}/>  
            <br />           
            <label htmlFor="last_name"> שם משפחה </label>
            <br /> 
            <input type='text' name='last_name' onInput={(e)=> setLast(e.target.value)}/>
            <br /> 
            <label htmlFor='guest_group'> שיעור </label>
            <br /> 
            <input type='text' name='guest_group' onInput={(e)=> setGroup(e.target.value)}/>
            <br /> 
            <HiveButton onClick={onClick}> הוסף </HiveButton>
        </form>
    </PopUp>
    )
}

export default AddGuest 