import { useQuery } from "react-query"
import "../style/guests_table.css"
import api from '../scripts/api/api'
import { useParams } from "react-router-dom"
import TableRow from "./table_row"

function GuestsTable(){
    let {map_name} = useParams()

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
    function create_rows(){
        var rows = []
        var i = 0
        if(guests_res.data){
            for(let guest of guests_res.data){
                i++
                rows.push(<TableRow guest={guest} key={i}></TableRow>)
            }
        }
        return rows
    }
    return(
        <div className="table_container">
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
        </div>
    )
}

export default GuestsTable