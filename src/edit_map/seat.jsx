import { useContext } from "react"
import { useRef } from "react"
import TagsCount from "../components/tags_count"
import { ActionsContext, EditContext, SelectablesContext } from "../app"
import "../style/seat.css"
import { DropContext, SelectedContext, SelectedRCcontext } from "./map"
import { useSeatBelongsData } from "../querys/seat_belongs"
import { useGuestsData } from "../querys/guests"
import { useGuestGroupsData } from "../querys/guest_groups"
import { useTagBelongsData } from "../querys/tag_belongs"

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

function NameBox({seat_id, tags, guest_name, group_color}){

    const [edit, setEdit] = useContext(EditContext)
    const [dropDownPos, setDropDownPos] = useContext(DropContext)
    const [selected_seat, setSelectedSeat] = useContext(SelectedContext)

    const nameBoxRef = useRef(null)

    function nameBoxOnClick(){
        if(edit == 'אל תערוך'){
            setDropDownPos(nameBoxRef.current)
            setSelectedSeat(seat_id)
        }
    }

    var font_size = (guest_name ? getFontSize(guest_name) : '')

    var color = getColor(group_color)

    const NAME_BOX_STYLE = {
        backgroundColor: group_color,
        fontSize: font_size,
        color: color
    }

    return(
        <div className="name_box" style={(edit !== 'ערוך' ? NAME_BOX_STYLE : null)} ref={nameBoxRef} onClick={nameBoxOnClick}>
            {(edit === 'ערוך' ? <TagsCount tags={tags}/> : guest_name)}
        </div>  
    )
} 


function Seat({seat}){
    const [edit, setEdit] = useContext(EditContext)
    const [selectebls] = useContext(SelectablesContext)
    const [action, setAction] = useContext(ActionsContext)
    const [selectedRC, setSelectedRC] = useContext(SelectedRCcontext)

    const belongs = useSeatBelongsData()
    const guests = useGuestsData()
    const groups = useGuestGroupsData()
    const tagsBelongs = useTagBelongsData()

    var guest_id
    if(belongs.data){
        var belongs_object = {}
        belongs.data.forEach(belong => belongs_object[belong.seat] = belong)
        var seat_belong = belongs_object[seat.id]
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

    var tags = (tagsBelongs.data ? tagsBelongs.data[seat.id] : null)

    if(edit === 'ערוך' && selectebls === 'seats'){
        var selectable_class = " selectable"
        var selected_class = (selectedRC.dir === 'row' && selectedRC.number === Number(seat.row_num) || selectedRC.dir === 'col' && selectedRC.number === Number(seat.col_num) ? " selected" : "")
    }else{
        var selectable_class = ""
        var selected_class = ""
    }

    if(seat.in_group && action === 'groups' && edit === 'ערוך') var selectable_class = ""

    var class_name = `seat${selectable_class}${selected_class}`

    return (
        <div>
            <div 
                className={class_name} 
                seat_id={seat.id}
                cell-row = {seat.row_num} 
                cell-col = {seat.col_num}
            >
                <div className="num_box">{seat.seat_number}</div> 
                <NameBox seat_id={seat.id} guest_name={guest_name} group_color={group_color} tags={tags}/>
            </div>
        </div>
    )
}

export default Seat