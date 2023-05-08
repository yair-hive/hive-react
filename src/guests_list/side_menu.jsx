import { useContext, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { Link, useParams } from "react-router-dom";
import { BelongsContext, GroupsContext, TagsContext, useHive } from "../app";
import AddGuest from "../components/add_guest";
import GroupsPop from "../components/groups_pop";
import ImportGuests from "../components/import_guests";
import HiveButton from "../hive_elements/hive_button";
import HiveSwitch from "../hive_elements/hive_switch";
import { TableRefContext } from "../pages/projects";
import { useGuestGroupsData } from "../querys/guest_groups";
import { useTagsData } from "../querys/tags";

function GuestsSideMenu(){

    const hive = useHive()
    const {map_name} = useParams()

    const [TableRefState, setTableRefState] = useContext(TableRefContext)

    const {onDownload} = useDownloadExcel({
        currentTableRef: TableRefState,
        filename: map_name,
        sheet: '1'
    })
    const [importPop, setImportPop] = useState(false)
    const [groupsPop, setGroupsPop] = useState(false)
    const [addGuestPop, setAddGuestPop] = useState(false)
    const [belongsStatus, setBelongsStatus] = useContext(BelongsContext)
    const [groupsStatus, setGroupsStatus] = useContext(GroupsContext)
    const [tagsStatus, setTagsStatus] = useContext(TagsContext)

    const groups = useGuestGroupsData()
    const tags = useTagsData()

    var groupsOptions, tagsOptions

    if(groups.data){
        var groups_array = Object.entries(groups.data)
        groupsOptions = groups_array.map(([key, group]) => {return group.name})
        groupsOptions.push('הכל')
    }
    if(tags.data){
        var tags_array = Object.entries(tags.data)
        tagsOptions = tags_array.map(([key, tag]) => {
            return {name:tag.name, value:tag.id}
        })
        tagsOptions.push('הכל')
    }

    return(
        <div className="sub_menu">
        <HiveButton onClick={()=>hive.openPopUp('add_guest')}> הוסף בחורים </HiveButton>
        <AddGuest id='add_guest'/>
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
            multipleSelect={true}
            options = {groupsOptions}
            active={'הכל'} 
            setActive={setGroupsStatus} 
            bordKey="KeyX" 
        />

        <HiveSwitch 
            multipleSelect={true}
            options = {tagsOptions}
            active={'הכל'} 
            setActive={setTagsStatus} 
            bordKey="KeyB" 
        />

        <HiveButton onClick={onDownload}> ייצא </HiveButton>
        </div>
    )
}

export default GuestsSideMenu