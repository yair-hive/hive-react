import { useQuery } from "react-query"
import "../style/guests_table.css"
import api from '../scripts/api/api'
import { useParams } from "react-router-dom"
import TableRow from "./table_row"
import { 
    useGroupsQuery, 
    useGuestBelogsQuery, 
    useGuestsQuery, 
    useSeatsQuery,
    useTagsBelongsQuery 
} from "../querys"

function GuestsTable(props){

    const seats_res = useSeatsQuery()
    const belongs_res = useGuestBelogsQuery()
    const guests = useGuestsQuery()
    const groups = useGroupsQuery()
    const tags_belongs = useTagsBelongsQuery()

    function create_rows(){
        var rows = []
        var i = 0
        if(guests.data && belongs_res.data && groups.data && seats_res.data && tags_belongs.data){
            var guests_array = Object.entries(guests.data)
            for(let [key, guest] of guests_array){
                i++
                var seat_id = false
                if(belongs_res.data[guest.id]) seat_id = belongs_res.data[guest.id].seat
                rows.push(<TableRow 
                        belongsStatus = {props.belongsStatus} 
                        groupsStatus = {props.groupsStatus}
                        tagsStatus = {props.tagsStatus}
                        guest={guest} 
                        key={i} 
                        group={groups.data[guest.guest_group]} 
                        seat={seats_res.data[seat_id]}
                        tags = {tags_belongs.data[seat_id]}
                    />)
            }
        }
        return rows
    }
    return(
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
    )
}

export default GuestsTable