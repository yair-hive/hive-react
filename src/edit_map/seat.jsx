import { useContext } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import TagsCount from "../components/tags_count"
import { EditContext, SelectablesContext } from "../app"
import { useSeatBelogsQuery, useGroupsQuery, useGuestsQuery, useTagsQuery, useTagsBelongsQuery, useBelogsQuery } from "../querys"
import "../style/seat.css"
import { DropContext, SelectedContext } from "./map"

function getColor(backColor){
    if(backColor){
        var color = 'black'
        var c = backColor.substring(1);      // strip #
        var rgb = parseInt(c, 16);   // convert rrggbb to decimal
        var r = (rgb >> 16) & 0xff;  // extract red
        var g = (rgb >>  8) & 0xff;  // extract green
        var b = (rgb >>  0) & 0xff;  // extract blue
    
        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
        if (luma < 160) {
            color = 'white'
        }
        return color
    }
}

function getFontSize(str){
    if(str.length > 14) return '11px'
    else return '15px'
}

function Seat(props){
    const [edit, setEdit] = useContext(EditContext)
    const [selectebls] = useContext(SelectablesContext)
    const [dropDownPos, setDropDownPos] = useContext(DropContext)
    const nameBoxRef = useRef(null)
    const belongs = useBelogsQuery()
    const guests = useGuestsQuery()
    const groups = useGroupsQuery()
    const tagsBelongs = useTagsBelongsQuery()
    const [selected_seat, setSelectedSeat] = useContext(SelectedContext)

    var guest_id
    if(belongs.data){
        var belongs_object = {}
        belongs.data.forEach(belong => belongs_object[belong.seat] = belong)
        var seat_belong = belongs_object[props.seat_id]
        guest_id = seat_belong?.guest
    }

    var guests_object
    if(guests.data){
        guests_object = {}
        guests.data.forEach(guest => guests_object[guest.id] = guest)
    }

    var guest = (guests_object && guest_id ? guests_object[guest_id] : null)

    var guest_name = (guest ? `${guest.last_name} ${guest.first_name}` : '')

    var group_color = (guest && groups.data ? groups.data[guest.guest_group]?.color : undefined)

    var font_size = (guest_name ? getFontSize(guest_name) : '')

    var color = getColor(group_color)

    var tags = (tagsBelongs.data ? tagsBelongs.data[props.seat_id] : null)

    function NameBox(){

        function nameBoxOnClick(){
            if(edit == 'אל תערוך'){
                setDropDownPos(nameBoxRef.current)
                setSelectedSeat(props.seat_id)
            }
        }
        const NAME_BOX_STYLE = {
            backgroundColor: group_color,
            fontSize: font_size,
            color: color
        }

        return(
            <div className="name_box" style={NAME_BOX_STYLE} ref={nameBoxRef} onClick={nameBoxOnClick}>
                {(edit === 'ערוך' ? <TagsCount tags={tags}/> : guest_name)}
            </div>  
        )
    } 

    return (
        <div>
            <div className={`seat ${(edit === 'ערוך' && selectebls === 'seats' ? "selectable" : "")}`} seat_id={props.seat_id}>
                <div className="num_box">{props.number}</div> 
                <NameBox />
            </div>
        </div>
    )
}

export default Seat