import { useContext } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import HiveButton from "../hive_elements/hive_button";
import HiveSwitch from "../hive_elements/hive_switch";
import PopUp from "../hive_elements/pop_up";
import { ActionsContext, SelectablesContext, TagsPopUpContext } from "../pages/maps";
import { EditContext } from "../pages/maps"
import { useGroupsQuery, useGuestBelogsQuery, useGuestsQuery, useMapQuery, useSeatsQuery } from "../querys";

import "../style/side_menu.css"
import TagsPop from "./tags_pop";

function SideMenu(props) {

    let {map_name} = useParams()

    const map  = useMapQuery()
    const seats = useSeatsQuery()
    const belongs = useGuestBelogsQuery()
    const guests = useGuestsQuery()
    const groups = useGroupsQuery()

    const [input_str, setInputStr] = useState('')
    const [tagsPopStatus, setTagsPopStatus] = useContext(TagsPopUpContext)

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
                    if(search_reg.test(corrent.name)){
                        match_list.push(corrent)
                    }
                }
            }
            return match_list
        }

        if(map.data && seats.data && belongs.data && guests.data && groups.data){
            var guests_with_belong = []
            var guest_array = Object.entries(guests.data)
            for(let [index, guest] of guest_array){
                var seat = belongs.data[guest.id]
                if(seat) {
                    seat = seat.seat
                    var seat_number = seats.data[seat]?.seat_number
                    guest.group_id = guest.guest_group
                    guest.group_name = groups.data[guest.group_id].group_name
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
                    <span>{match.name}</span>
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
                    <HiveButton onClick={()=> {setTagsPopStatus(true)}}> תגיות </HiveButton>
                    <TagsPop status={tagsPopStatus} setState = {setTagsPopStatus}/>
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