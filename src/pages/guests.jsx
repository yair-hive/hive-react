import { useState } from "react";
import GuestsTable from "../guests_list/guests_table";
import GuestsSideMenu from "../guests_list/side_menu";

function Guests(){

    const [belongsStatus, setBelongsStatus] = useState('הכל')
    const [groupsStatus, setGroupsStatus] = useState('הכל')
    const [tagsStatus, setTagsStatus] = useState('הכל')

    return(
        <>
        <div className='main_bord guest_table'>
            <GuestsTable 
                belongsStatus = {belongsStatus} 
                groupsStatus = {groupsStatus} 
                tagsStatus = {tagsStatus}
            />
        </div>
        <div className="side_menu">
            <GuestsSideMenu 
                setBelongsStatus = {setBelongsStatus} 
                setGroupsStatus = {setGroupsStatus} 
                setTagsStatus = {setTagsStatus}
            />
        </div>
        </>
    )
}

export default Guests