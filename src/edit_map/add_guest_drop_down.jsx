import { useState } from "react"
import DropDown from "../hive_elements/dropDown"
import RolligList from "../hive_elements/rolling_list"
import InputBox from "./input_box"

function AddGuestDropDown(props){

    const guests_res = props.guests_res

    const [inputStr, setInputStr] = useState('')

    function createMatchList(){
        var match_list = [] 
        if(inputStr.length != 0){
            var search_reg = new RegExp('^'+inputStr)
            for(var corrent of guests_res.data){
                corrent.name = corrent.last_name+' '+corrent.first_name
                if(search_reg.test(corrent.name)){
                    match_list.push(corrent.name)
                }
            }
        }
        return match_list
    }
    function createGuestsList(){
        var arr = []
        var MatchList = createMatchList()
        var i = 0
        for(let corrent of MatchList){
            i++
            var li = <li key={i} className="match_list"> {corrent} </li>                           
            arr.push(li)
        }
        return arr
    }

    return (
        <>
        <InputBox status={props.status} pos={props.pos} setInputStr={setInputStr}></InputBox>
        <DropDown status={props.status} pos={props.pos}>
            {/* <ul>
                {createGuestsList()}
            </ul> */}
            <RolligList items={createMatchList()}/>
        </DropDown>
        </>
    )
}

export default AddGuestDropDown