import { useContext } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import TagsCount from "../components/tags_count"
import { EditContext, SelectablesContext } from "../pages/maps"
import { useSeatBelogsQuery, useGroupsQuery, useGuestsQuery, useTagsQuery, useTagsBelongsQuery } from "../querys"
import "../style/seat.css"
import { DropContext, SelectedContext } from "./map"

function getColor(backColor){
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

function getFontSize(str){
    if(str.length > 14) return '11px'
    else return '15px'
}

function Seat(props){
    const edit = useContext(EditContext)
    const selecteblsState = useContext(SelectablesContext)
    const [dropDownPos, setDropDownPos] = useContext(DropContext)
    const nameBoxRef = useRef(null)
    const belongs = useSeatBelogsQuery()
    const guests = useGuestsQuery()
    const groups = useGroupsQuery()
    const tagsBelongs = useTagsBelongsQuery()
    const [guest_id, setGuestId] = useState(null) 
    const [guest, setGuest] = useState({})
    const [group, setGroup] = useState({})
    const [tags, setTags] = useState()
    const [selected_seat, setSelectedSeat] = useContext(SelectedContext)

    var color, font_size = ''
    if(group?.color) color = getColor(group?.color)
    if(guest?.name) font_size = getFontSize(guest?.name)

    useEffect(()=>{
        if(belongs.data){
            var seat_belong = belongs.data[props.seat_id]
            setGuestId(seat_belong?.guest)
        }
    }, [belongs.data])

    useEffect(()=>{
        if(tagsBelongs.data){
            var seat_tags = tagsBelongs.data[props.seat_id]
            if(seat_tags) setTags(seat_tags)
        }
    }, [tagsBelongs])

    useEffect(()=>{
        if(guests.data && guest_id){
            setGuest(guests.data[guest_id])
        }
    }, [guests.data, guest_id])

    useEffect(()=>{
        if(guest && groups.data){
            setGroup(groups.data[guest.guest_group])
        }
    }, [guest, groups.data])

    function nameBoxOnClick(){
        setDropDownPos(nameBoxRef.current)
        setSelectedSeat(props.seat_id)
    }
    const NAME_BOX_STYLE = {
        backgroundColor: group?.color,
        fontSize: font_size,
        color: color
    }

    function name_box(){
        if(edit === 'ערוך'){
            return <div className="name_box"> <TagsCount tags={tags}/></div>
        }
        return(
            <div className="name_box" style={NAME_BOX_STYLE} ref={nameBoxRef} onClick={nameBoxOnClick}>
                {guest.name}
            </div>  
        )
    } 
    var className = "seat"
    if(selecteblsState){
        if(selecteblsState[0] === 'seat') className = className+" selectable"
    }
    return (<div>
        <div className={className} seat_id={props.seat_id}>
            <div className="num_box">{props.number}</div> 
            {name_box()}
        </div>
    </div>)
}

export default Seat