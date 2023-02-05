import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddGuest from "../components/add_guest";
import GroupsPop from "../components/groups_pop";
import ImportGuests from "../components/import_guests";
import HiveButton from "../hive_elements/hive_button";
import HiveSwitch from "../hive_elements/hive_switch";
import { useGroupsQuery, useTagsQuery } from "../querys";

function GuestsSideMenu(props){

    const {map_name} = useParams()
    const [importPop, setImportPop] = useState(false)
    const [groupsPop, setGroupsPop] = useState(false)
    const [addGuestPop, setAddGuestPop] = useState(false)
    const {setBelongsStatus, setGroupsStatus, setTagsStatus} = props

    const groups = useGroupsQuery()
    const tags = useTagsQuery()

    var groupsOptions, tagsOptions

    if(groups.data){
        var groups_array = Object.entries(groups.data)
        groupsOptions = groups_array.map(([key, group]) => {return group.group_name})
        groupsOptions.push('הכל')
    }
    if(tags.data){
        var tags_array = Object.entries(tags.data)
        tagsOptions = tags_array.map(([key, tag]) => {
            return {name:tag.tag_name, value:tag.id}
        })
        tagsOptions.push('הכל')
    }

    return(
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
    )
}

export default GuestsSideMenu