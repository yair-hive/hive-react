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
    const selecteblsState = useContext(SelectablesContext)
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

    var guest
    if(guests_object && guest_id){
        guest = guests_object[guest_id]
    }

    var guest_name
    if(guest){
        guest_name = guest.last_name + ' ' + guest.first_name
    }

    var group_color = undefined
    if(guest && groups.data){
        group_color = groups.data[guest.guest_group]?.color
    }
    var color, font_size = ''
    color = getColor(group_color)
    if(guest_name) font_size = getFontSize(guest_name)

    var tags
    if(tagsBelongs.data){
        var seat_tags = tagsBelongs.data[props.seat_id]
        if(seat_tags) tags = seat_tags
    }

    function nameBoxOnClick(){
        setDropDownPos(nameBoxRef.current)
        setSelectedSeat(props.seat_id)
    }
    const NAME_BOX_STYLE = {
        backgroundColor: group_color,
        fontSize: font_size,
        color: color
    }

    function name_box(){
        if(edit === 'ערוך'){
            return <div className="name_box"> <TagsCount tags={tags}/></div>
            // return <div className="name_box"> {props.seat.col_score} & {props.seat.row_score} & {props.seat.pass_score}</div>
        }
        return(
            <div className="name_box" style={NAME_BOX_STYLE} ref={nameBoxRef} onClick={nameBoxOnClick}>
                {guest_name}
            </div>  
        )
    } 
    var className = "seat"
    if(selecteblsState){
        if(selecteblsState[0] === 'seats') className = className+" selectable"
    }
    return (<div>
        <div className={className} seat_id={props.seat_id}>
            <div className="num_box">{props.number}</div> 
            {name_box()}
        </div>
    </div>)
}

export default Seat