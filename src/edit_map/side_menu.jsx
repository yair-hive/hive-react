import { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import HiveButton from "../hive_elements/hive_button";
import HiveSwitch from "../hive_elements/hive_switch";
import { MBloaderContext, useSocket } from '../app'
import { ActionsContext, SelectablesContext } from "../app";
import { EditContext } from "../app"
import "../style/side_menu.css"
import TagsPop from "./tags_pop";
import { useQueryClient } from "react-query";
import { useMapsData, useMapsUpdate } from "../querys/maps";
import { useSeatsData, useSeatsDataAll } from "../querys/seats";
import { useSeatBelongsData } from "../querys/seat_belongs";
import { useGuestsData } from "../querys/guests";
import { useGuestGroupsData } from "../querys/guest_groups";

function MapSideMenu() {

    const {map_name} = useParams()
    const [edit, setEdit] = useContext(EditContext)

    const map  = useMapsData()
    const seats = useSeatsDataAll()
    const belongs = useSeatBelongsData()
    const guests = useGuestsData()
    const groups = useGuestGroupsData()

    const [input_str, setInputStr] = useState('')
    const [tagsPopStatus, setTagsPopStatus] = useState(false)
    const [colsTo, setColsTo] = useState(undefined)

    const selecteblsState = useContext(SelectablesContext)
    const [action, setAction] = useContext(ActionsContext)
    const [MBstatus, setMBStatus] = useContext(MBloaderContext)
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()

    const update_cols_to = useMapsUpdate().cols_to

    useEffect(()=>{
        if(colsTo) update_cols_to({to: colsTo})
    }, [colsTo])

    function scheduling(){
        const source = new EventSource(`http://localhost:3025/actions/scheduling/${map_name}`);

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
            var belongs_object = {}
            var seats_object = {}
            belongs.data.forEach(belong => belongs_object[belong.guest] = belong)
            seats.data.forEach(seat => seats_object[seat.id] = seat)
            var guests_with_belong = []
            for(let guest of guests.data){
                var seat = belongs_object[guest.id]
                if(seat) {
                    seat = seat.seat
                    var seat_number = seats_object[seat]?.seat_number
                    guest.group_id = guest.guest_group
                    guest.group_name = groups.data[guest.group_id].group_name
                    guest.name = guest.last_name + ' ' + guest.first_name
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
                        {value: 'seats', name: 'כיסאות'}, 
                        {value: 'cells', name: 'תאים'}
                    ]} 
                    active={'cells'} 
                    setActive={selecteblsState[1]} 
                    bordKey="KeyX" 
                />
            )
        }
    }

    function actionSwitch(){
        if(selecteblsState[0] == 'cells'){
            return (
                <HiveSwitch
                options={[
                    {value: 'seats', name: 'כיסאות'}, 
                    {value: 'elements', name: 'אלמנטים'}
                ]} 
                active={'seats'} 
                setActive={setAction} 
                bordKey="KeyB" 
            />
            )
        }
        if(selecteblsState[0] == 'seats'){
            return (
                <HiveSwitch
                options={[
                    {value: 'numbers', name: 'מספרים'}, 
                    {value: 'tags', name: 'תגיות'},
                    {value: 'seats', name: 'כיסאות'},
                    {value: 'groups', name: 'טורים'}
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
                <HiveSwitch
                    active={map.data?.cols_to}
                    options={[
                        {name: 'ימין', value: 'right'},
                        {name: 'מרכז', value: 'center'},
                        {name: 'שמאל', value: 'left'},
                    ]}
                    setActive={setColsTo}
                />
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

    if(!map_name) return

    return ( 
        <>
            <HiveSwitch 
                options={['אל תערוך', 'ערוך']} 
                active={'אל תערוך'} 
                setActive={setEdit} 
                bordKey="KeyQ" 
            />
            {editSubMenu()}
            {noEditSubMenu()}
        </>
    );
}

export default MapSideMenu;