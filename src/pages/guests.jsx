import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import AddGuest from "../components/add_guest";
import GroupsPop from "../components/groups_pop";
import ImportGuests from "../components/import_guests";
import GuestsTable from "../guests_list/guests_table";
import HiveButton from "../hive_elements/hive_button";
import HiveSwitch from "../hive_elements/hive_switch";
import PopUp from "../hive_elements/pop_up";
import api from "../scripts/api/api";

function Guests(){

    let {map_name} = useParams()

    const [belongsStatus, setBelongsStatus] = useState('הכל')
    const [groupsStatus, setGroupsStatus] = useState('הכל')
    const [tagsStatus, setTagsStatus] = useState('הכל')
    const [importPop, setImportPop] = useState(false)
    const [groupsPop, setGroupsPop] = useState(false)
    const [addGuestPop, setAddGuestPop] = useState(false)

    const  map_res  = useQuery(['get_map', map_name], async ()=>{
        return await api.map.get(map_name)
    })

    const map_id = map_res.data?.id

    const guests_groups_res = useQuery(['guests_groups', map_name], async ()=>{
        return await api.guest.get_all_groups(map_id)
    }, {
        enabled: !!map_id,
        refetchOnMount: false
    })

    var groupsOptions = guests_groups_res.data?.map(group => {
        return group.group_name
    })
    groupsOptions?.push('הכל')

    const tags_res = useQuery(['get_tags', map_name], async ()=>{
        return await api.tags.get_tags({map_id:map_id})
    }, {
        enabled: !!map_id,
        refetchOnMount: false
    })

    var tagsOptions = tags_res.data?.map(tag => {
        return tag.tag_name
    })
    tagsOptions?.push('הכל')

    return(
        <>
        <div className='main_bord'>
            <GuestsTable 
                belongsStatus = {belongsStatus} 
                groupsStatus = {groupsStatus} 
                tagsStatus = {tagsStatus}
            />
        </div>
        <div className="side_menu">
            <div className="sub_menu">
            <Link to={`/maps/${map_name}`}>
                <HiveButton> חזור למפה </HiveButton>
            </Link>
            <HiveButton onClick={()=> setAddGuestPop(true)}> הוסף בחורים </HiveButton>
            <AddGuest status={addGuestPop} setState = {setAddGuestPop}/>
            <HiveButton onClick={()=> setImportPop(true)}> ייבא בחורים </HiveButton>
            <ImportGuests status={importPop} setState = {setImportPop}/>
            <HiveButton onClick={()=> setGroupsPop(true)}> קבוצות </HiveButton>
            <GroupsPop status={groupsPop} setState = {setGroupsPop}/>
            <HiveSwitch 
                options={['משובצים', 'לא משובצים', 'הכל']} 
                active={'הכל'} 
                setActive={setBelongsStatus} 
                bordKey="KeyQ" 
            />
            <HiveSwitch 
                options = {groupsOptions}
                active={'הכל'} 
                setActive={setGroupsStatus} 
                bordKey="KeyX" 
            />

            <HiveSwitch 
                options = {tagsOptions}
                active={'הכל'} 
                setActive={setTagsStatus} 
                bordKey="KeyB" 
            />

            <HiveButton> ייצא </HiveButton>
            </div>
        </div>
        </>
    )
}

export default Guests