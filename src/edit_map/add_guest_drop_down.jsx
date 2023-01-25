import { useState } from "react"
import { useParams } from "react-router-dom"
import { useSocket } from "../app"
import DropDown from "../hive_elements/dropDown"
import RolligList from "../hive_elements/rolling_list"
import api from "../scripts/api/api"
import InputBox from "./input_box"

function AddGuestDropDown(props){

    let {map_name} = useParams()

    const guests_res = props.guests_res

    const [inputStr, setInputStr] = useState('')
    const hiveSocket = useSocket()

    function onItem(item){
        api.guest.create_belong(item.value, props.selected_seat, props.map.data.id)
        .then((res)=> {
            console.log(res)
            if(res.msg === 'exists'){
                if(window.confirm('המשתמש כבר משובץ האם אתה רוצה לשבץ מחדש?')){
                    api.guest.update_belong(item.value, props.selected_seat, props.map.data.id)
                    .then(()=>{
                        var msg = JSON.stringify({action: 'invalidate', quert_key: ['get_belongs', map_name]})
                        hiveSocket.send(msg)
                    })
                }
            }else{
                var msg = JSON.stringify({action: 'invalidate', quert_key: ['get_belongs', map_name]})
                hiveSocket.send(msg)
            }
        })
    }

    function createMatchList(){
        var match_list = [] 
        if(inputStr.length != 0){
            var search_reg = new RegExp('^'+inputStr)
            for(var corrent of guests_res.data){
                corrent.name = corrent.last_name+' '+corrent.first_name
                if(search_reg.test(corrent.name)){
                    match_list.push({name: corrent.name, value: corrent.id})
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
            <RolligList items={createMatchList()} onItem={onItem}/>
        </DropDown>
        </>
    )
}

export default AddGuestDropDown