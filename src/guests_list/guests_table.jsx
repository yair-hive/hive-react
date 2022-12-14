import { useQuery } from "react-query"
import "../style/guests_table.css"
import api from '../scripts/api/api'
import { useParams } from "react-router-dom"
import TableRow from "./table_row"

function GuestsTable(props){
    let {map_name} = useParams()

    const  map_res  = useQuery(['get_map', map_name], async ()=>{
        return await api.map.get(map_name)
    })

    const map_id = map_res.data?.id

    const seats_res = useQuery(['get_seats', map_name], async ()=>{
        return await api.seat.get_all(map_id)
    }, {
        enabled: !!map_id,
        refetchOnMount: false
    })

    const belongs_res = useQuery(['get_belongs', map_name], async ()=>{
        return await api.seat.get_belong(map_id)
    }, {
        enabled: !!map_id,
        refetchOnMount: false
    })

    const guests_res = useQuery(['get_guests', map_name], async ()=>{
        return await api.guest.get_all({map_id: map_id})
    }, {
        enabled: !!map_id,
        refetchOnMount: false
    })
    const guests_groups_res = useQuery(['guests_groups', map_name], async ()=>{
        return await api.guest.get_all_groups(map_id)
    }, {
        enabled: !!map_id,
        refetchOnMount: false
    })
    const seat_tags_res = useQuery(['get_seat_tags', map_name], async ()=>{
        return await api.tags.get_all_belongs(map_id)
    }, {
        enabled: !!map_id,
        refetchOnMount: false
    })
    const tags_res = useQuery(['get_tags', map_name], async ()=>{
        return await api.tags.get_tags({map_id:map_id})
    }, {
        enabled: !!map_id,
        refetchOnMount: false
    })
    function create_rows(){
        var new_belong = {}
        var rows = []
        var i = 0
        if(guests_res.data && belongs_res.data && guests_groups_res.data && seats_res.data && tags_res.data){
            belongs_res.data.map(bel => {
                new_belong[bel.guest] = bel
            })
            var new_groups = {}
            guests_groups_res.data.map(group => {
                new_groups[group.id] = group
            })
            var new_seats = {}
            seats_res.data.map(seat =>{
                new_seats[seat.id] = seat
            })
            var new_seat_tags = {}
            seat_tags_res.data.map(tag => {
                new_seat_tags[tag.seat] = []
            })
            var new_tags = {}
            tags_res.data.map(tag => {
                new_tags[tag.id] = tag
            })
            seat_tags_res.data.map(tag => {
                var tag_id = tag.group_id
                var tag_name = new_tags[tag_id].group_name
                new_seat_tags[tag.seat]?.push(tag_name)
            })
            for(let guest of guests_res.data){
                i++
                var seat_id = false
                if(new_belong[guest.id]) seat_id = new_belong[guest.id].seat
                rows.push(<TableRow 
                        belongsStatus = {props.belongsStatus} 
                        groupsStatus = {props.groupsStatus}
                        guest={guest} 
                        key={i} 
                        group={new_groups[guest.guest_group]} 
                        seat={new_seats[seat_id]}
                        tags = {new_seat_tags[seat_id]}
                    />)
            }
        }
        return rows
    }
    return(
        <div className="table_container">
            <table className="names_table" dir="rtl">
                <tbody>
                    <tr>
                        <th> ?????????? </th>
                        <th> ?????????? </th>
                        <th> ???? ?????????? </th>
                        <th> ???? ???????? </th>
                        <th> ?????????? </th>
                        <th> ?????????? </th>
                        <th> ?????????? </th>
                        <th> X </th>
                    </tr>
                    {create_rows()}
                </tbody>
            </table>
        </div>
    )
}

export default GuestsTable