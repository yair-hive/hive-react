import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import GuestsTable from "../guests_list/guests_table";
import HiveButton from "../hive_elements/hive_button";
import HiveSwitch from "../hive_elements/hive_switch";

function Guests(){
    const [belongsStatus, setBelongsStatus] = useState('הכל')

    let {map_name} = useParams()

    return(
        <>
        <div className='main_bord'>
            <GuestsTable belongsStatus= {belongsStatus}/>
        </div>
        <div className="side_menu">
            <div className="sub_menu">
            <Link to={`/maps/${map_name}`}>
                <HiveButton> חזור למפה </HiveButton>
            </Link>
            <HiveButton> הוסף בחורים </HiveButton>
            <HiveButton> ייבא בחורים </HiveButton>
            <HiveButton> קבוצות </HiveButton>
            <HiveSwitch options={['משובצים', 'לא משובצים', 'הכל']} active={'הכל'} setActive={setBelongsStatus} bordKey="KeyQ"></HiveSwitch>
            <HiveButton> ייצא </HiveButton>
            </div>
        </div>
        </>
    )
}

export default Guests