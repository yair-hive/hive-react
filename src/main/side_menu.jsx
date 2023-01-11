import { useState } from "react";
import { useQuery } from "react-query";
import { Routes, Route, Link, useParams, } from "react-router-dom";
import HiveButton from "../hive_elements/hive_button";
import HiveSwitch from "../hive_elements/hive_switch";
import api from "../scripts/api/api";
import "../style/side_menu.css"

function MapSideMenu(){

    let {map_name} = useParams()

    const [input_str, setInputStr] = useState('')

    const  map_res  = useQuery(['get_map', map_name], async ()=>{
        return await api.map.get(map_name)
    })

    const map_id = map_res.data?.id

    const seats_res = useQuery(['get_seats', map_name], async ()=>{
        return await api.seat.get_all(map_id)
    }, {
        enabled: !!map_id,
    })

    const belongs_res = useQuery(['get_belongs', map_name], async ()=>{
        return await api.seat.get_belong(map_id)
    }, {
        enabled: !!map_id,
    })

    const guests_res = useQuery(['get_guests', map_name], async ()=>{
        return await api.guest.get_all({map_id: map_id})
    }, {
        enabled: !!map_id,
    })
    const guests_groups_res = useQuery(['guests_groups', map_name], async ()=>{
        return await api.guest.get_all_groups(map_id)
    }, {
        enabled: !!map_id,
    })

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

    function onGuestList(){
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

    return(<div className="sub_menu">
        <Link to='edit'><HiveButton> ערוך </HiveButton></Link>
        <Link to={"/guests/"+map_name}><HiveButton>שמות</HiveButton></Link>
        <HiveButton> שבץ </HiveButton>
        <input type='text' onInput={onInput}></input>
        <ul className="results" dir="rtl">{onGuestList()}</ul>
    </div>)
}

function LoginSideMenu(){
    return null
}

function HomeSideMenu(){
    return null
}

function GuestsSideMenu(){

    const [belongsStatus, setBelongsStatus] = useState('הכל')

    let {map_name} = useParams()

    return(
        <div className="sub_menu">
        <Link to={`/maps/${map_name}`}>
            <HiveButton> חזור למפה </HiveButton>
        </Link>
        <HiveButton> הוסף בחורים </HiveButton>
        <HiveButton> ייבא בחורים </HiveButton>
        <HiveButton> קבוצות </HiveButton>
        <HiveSwitch options={['משובצים', 'לא משובצים', 'הכל']} active={belongsStatus} setActive={setBelongsStatus} bordKey="KeyQ"></HiveSwitch>
        <HiveButton> ייצא </HiveButton>
        </div>
    )
}

function MapEditSideMenu(){
    var {map_name} = useParams()
    return(
        <div className="sub_menu">
            <Link to={`/maps/${map_name}`}><HiveButton active={true}> ערוך </HiveButton></Link>
            <HiveButton> הוסף </HiveButton>
            <HiveButton> מחק </HiveButton>
            <HiveButton> תגיות </HiveButton>
        </div>
    )
}

function SideMenu(){
    return(
        <div className="side_menu">
            <Routes>
                <Route path='/' element={<HomeSideMenu/>} />
                <Route path='/login' element={<LoginSideMenu/>} />
                <Route path='/maps/:map_name/*' element={<MapSideMenu/>} />
                <Route path='/maps/:map_name/:edit' element={<MapEditSideMenu/>} />
                <Route path='/guests/:map_name' element={<GuestsSideMenu/>} />
            </Routes>
        </div>
    )
}

export default SideMenu