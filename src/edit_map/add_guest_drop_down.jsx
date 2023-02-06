import { useState } from "react"
import { useParams } from "react-router-dom"
import { useSocket } from "../app"
import DropDown from "../hive_elements/dropDown"
import RolligList from "../hive_elements/rolling_list"
import { useAddGuest } from "../mutations"
import { useGuestsQuery } from "../querys"
import api from "../scripts/api/api"
import InputBox from "./input_box"

function AddGuestDropDown(props){

    let {map_name} = useParams()

    const guests = useGuestsQuery()

    const [inputStr, setInputStr] = useState('')
    const hiveSocket = useSocket()
    const add_guest = useAddGuest()

    function onItem(item){
        add_guest.mutate({
            guest_id: item.value, 
            seat_id: props.selected_seat
        })
        // api.guest.create_belong(item.value, props.selected_seat, props.map.data.id)
        // .then((res)=> {
        //     if(res.msg === 'exists'){
        //         if(window.confirm('המשתמש כבר משובץ האם אתה רוצה לשבץ מחדש?')){
        //             api.guest.update_belong(item.value, props.selected_seat, props.map.data.id)
        //             .then((res)=>{
        //                 console.log(res)
        //                 var msg = JSON.stringify({action: 'invalidate', quert_key: ['get_belongs', map_name]})
        //                 hiveSocket.send(msg)
        //             })
        //         }
        //     }else{
        //         var msg = JSON.stringify({action: 'invalidate', quert_key: ['get_belongs', map_name]})
        //         hiveSocket.send(msg)
        //     }
        // })
    }

    function createMatchList(){
        var match_list = [] 
        if(inputStr.length != 0){
            var search_reg = new RegExp('^'+inputStr)
            var guest_array = Object.entries(guests.data)
            for(var [index, corrent] of guest_array){
                corrent.name = corrent.last_name+' '+corrent.first_name
                if(search_reg.test(corrent.name)){
                    match_list.push({name: corrent.name, value: corrent.id})
                }
            }
        }
        return match_list
    }

    return (
        <>
        <InputBox pos={props.pos} setInputStr={setInputStr}></InputBox>
        <DropDown pos={props.pos}>
            <RolligList items={createMatchList()} onItem={onItem}/>
        </DropDown>
        </>
    )
}

export default AddGuestDropDown