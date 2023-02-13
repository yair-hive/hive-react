import { useQuery } from "react-query"
import "../style/guests_table.css"
import api from '../scripts/api/api'
import { useParams } from "react-router-dom"
import TableRow from "./table_row"
import { 
    useBelogsQuery,
    useGroupsQuery, 
    useGuestBelogsQuery, 
    useGuestsQuery, 
    useSeatsQuery,
    useTagsBelongsQuery 
} from "../querys"
import { useEffect, useState } from "react"
import RequestsDrop from "./requestsDrop"

function GuestsTable(props){

    const seats_res = useSeatsQuery()
    const belongs_res = useBelogsQuery()
    const guests = useGuestsQuery()
    const groups = useGroupsQuery()
    const tags_belongs = useTagsBelongsQuery()
    const [dropPos, setDropPos] = useState(null)
    const [selectedGuest, setSelectedGuest] = useState(undefined)

    function onMousedown(event){
        var classList = event.target.classList
        if(!event.ctrlKey && !event.metaKey && !classList.contains('hive_button')){
            if(!classList.contains('drop-down') && !classList.contains('rolling-list-item')){
                setDropPos(null)
            }                               
        }
    }

    useEffect(()=>{
        document.addEventListener('mousedown', onMousedown)
        return ()=>{
            document.removeEventListener('mousedown', onMousedown)
        }
    }, [])

    function create_rows(){
        var rows = []
        var i = 0
        if(guests.data && belongs_res.data && groups.data && seats_res.data && tags_belongs.data){
            var belongs_object = {}
            belongs_res.data.forEach(belong => belongs_object[belong.guest] = belong)
            for(let guest of guests.data){
                i++
                var seat_id = false
                if(belongs_object[guest.id]) seat_id = belongs_object[guest.id].seat
                rows.push(<TableRow 
                        belongsStatus = {props.belongsStatus} 
                        groupsStatus = {props.groupsStatus}
                        tagsStatus = {props.tagsStatus}
                        guest={guest} 
                        key={i} 
                        group={groups.data[guest.guest_group]} 
                        seat={seats_res.data[seat_id]}
                        tags = {tags_belongs.data[seat_id]}
                        setDropPos={setDropPos}
                        setSelectedGuest={setSelectedGuest}
                    />)
            }
        }
        return rows
    }
    return(
        <>
        <RequestsDrop 
            pos={dropPos} 
            setPos={setDropPos} 
            selected={selectedGuest} 
            setSelected={setSelectedGuest}
        />
        <table className="names_table" dir="rtl">
            <tbody>
                <tr>
                    <th> סטטוס </th>
                    <th> תגיות </th>
                    <th> שם משפחה </th>
                    <th> שם פרטי </th>
                    <th> שיעור </th>
                    <th> ניקוד </th>
                    <th> בקשות </th>
                    <th> X </th>
                </tr>
                {create_rows()}
            </tbody>
        </table>
        </>
    )
}

export default GuestsTable