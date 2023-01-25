import { useContext } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import HiveButton from "../hive_elements/hive_button";
import HiveSwitch from "../hive_elements/hive_switch";
import { ActionsContext, SelectablesContext } from "../pages/maps";
import { EditContext } from "../pages/maps"

import "../style/side_menu.css"

function SideMenu(props) {

    let {map_name} = useParams()

    const  map_res  = props.map_res
    const seats_res = props.seats_res
    const belongs_res = props.belongs_res 
    const guests_res = props.guests_res
    const guests_groups_res = props.guests_groups_res

    const [input_str, setInputStr] = useState('')

    const selecteblsState = useContext(SelectablesContext)
    const [action, setAction] = useContext(ActionsContext)
    const edit = useContext(EditContext)
    
    function guestsList(){
        function createMatchList(guests_data){
            var match_list = []
            var search_str = '^'+input_str
            if(input_str.length != 0){
                var search_reg = new RegExp(search_str)
                for(var corrent of guests_data){
                    if(search_reg.test(corrent.full_name)){
                        match_list.push(corrent)
                    }
                }
            }
            return match_list
        }

        if(map_res.data && seats_res.data && belongs_res.data && guests_res.data && guests_groups_res.data){
            var new_belongs = {}
            var new_seats = {}
            var new_groups = {}
            belongs_res.data.map(bel => {new_belongs[bel.guest] = bel})
            seats_res.data.map(seat => {new_seats[seat.id] = seat})
            guests_groups_res.data.map(group => {new_groups[group.id] = group})
            var guests_with_belong = []
            for(let guest of guests_res.data){
                var seat = new_belongs[guest.id]
                if(seat) {
                    seat = seat.seat
                    var seat_number = new_seats[seat].seat_number
                    guest.group_id = guest.guest_group
                    guest.group_name = new_groups[guest.group_id].group_name
                    guest.full_name = guest.last_name  + ' ' + guest.first_name
                    guest.seat_number = seat_number
                    guests_with_belong.push(guest)
                }
            }
            var matchList = createMatchList(guests_with_belong)
            var elements_list = []
            var i = 0
            for(let match of matchList){
                i++
                var match_element = <li key={i}>
                    <span>{match.full_name}</span>
                    <span>
                        <span className="seat_number">
                            {`| ${match.seat_number} | `}
                        </span>
                        <span className="guest_group"> 
                            {match.group_name}
                        </span>
                    </span>
                </li>
                elements_list.push(match_element)
            }
            return elements_list
        }
    }

    function onInput(event){
        setInputStr(event.target.value)
    }

    function selecteblsSwitch(){
        if(selecteblsState){
            return (
                <HiveSwitch
                    options={[
                        {value: 'seat', name: 'כיסאות'}, 
                        {value: 'cell', name: 'תאים'}
                    ]} 
                    active={'cell'} 
                    setActive={selecteblsState[1]} 
                    bordKey="KeyX" 
                />
            )
        }
    }

    function actionSwitch(){
        if(selecteblsState[0] == 'cell'){
            return (
                <HiveSwitch
                options={[
                    {value: 'seat', name: 'כיסאות'}, 
                    {value: 'element', name: 'אלמנטים'}
                ]} 
                active={'seat'} 
                setActive={setAction} 
                bordKey="KeyB" 
            />
            )
        }
        if(selecteblsState[0] == 'seat'){
            return (
                <HiveSwitch
                options={[
                    {value: 'numbers', name: 'מספרים'}, 
                    {value: 'tags', name: 'תגיות'}
                ]} 
                active={'numbers'} 
                setActive={setAction}
                bordKey="KeyB" 
            />
            )
        }
    }

    function noEditSubMenu(){
        if(edit === 'אל תערוך'){
            return(
                <div className="sub_menu">
                    <Link to={"/guests/"+map_name}><HiveButton>שמות</HiveButton></Link>
                    <HiveButton> שבץ </HiveButton>
                    <input type='text' onInput={onInput}></input>
                    <ul className="results" dir="rtl">{guestsList()}</ul>
                </div>
            )
        }
    }

    function editSubMenu(){
        if(edit === 'ערוך'){
            return(
                <div className="sub_menu">
                    {selecteblsSwitch()}
                    {actionSwitch()}
                    <HiveButton> הוסף </HiveButton>
                    <HiveButton> מחק </HiveButton>
                    <HiveButton> תגיות </HiveButton>
                </div>
            )
        }
    }

    return ( 
        <>
        <HiveSwitch 
            options={['אל תערוך', 'ערוך']} 
            active={'אל תערוך'} 
            setActive={props.setEditStatus} 
            bordKey="KeyQ" 
        />
        {editSubMenu()}
        {noEditSubMenu()}
        </>
    );
}

export default SideMenu;