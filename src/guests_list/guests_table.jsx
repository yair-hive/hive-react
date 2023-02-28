import "../style/guests_table.css"
import TableRow from "./table_row"
import { useEffect, useState } from "react"
import RequestsDrop from "./requestsDrop"
import { useSeatsData } from "../querys/seats"
import { useGuestsData } from "../querys/guests"
import { useGuestGroupsData } from "../querys/guest_groups"
import { useTagBelongsData } from "../querys/tag_belongs"

function GuestsTable(){

    const seats_res = useSeatsData()
    const belongs_res = useSeatsData()
    const guests = useGuestsData()
    const groups = useGuestGroupsData()
    const tags_belongs = useTagBelongsData()
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
        <div className="guest_table">
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
        </>
    )
}

export default GuestsTable