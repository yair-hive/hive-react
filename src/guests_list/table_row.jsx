import TagsCount from "../components/tags_count"
import { TdFirst, TdGroup, TdLast, TdScore, TdX } from "./tds_components"

function TableRow(props){
    var belong
    var tags_ids = props.tags?.map(tag => tag.group_id)
    if(props.seat) belong = 'belong'
    if(props.seat && props.belongsStatus == 'לא משובצים') return
    if(!props.seat && props.belongsStatus == 'משובצים') return
    if(props.groupsStatus != 'הכל' && props.groupsStatus != props.group.group_name) return
    if(props.tagsStatus != 'הכל' && !props.tags) return
    if(props.tagsStatus != 'הכל' && tags_ids?.indexOf(props.tagsStatus) == -1) return

    return(
        <tr>
            <td className={'seat_number'} belong={belong}>{props.seat?.seat_number}</td>
            <td><TagsCount tags={props.tags}/></td>
            <TdLast last_name={props.guest.last_name} guest_id={props.guest.id}/>
            <TdFirst first_name={props.guest.first_name} guest_id={props.guest.id}/>
            <TdGroup group={props.group.group_name} guest_id={props.guest.id}/>
            <TdScore score={Number(props.guest.score) + Number(props.group.score)} guest_id={props.guest.id}/>
            <td></td>
            <TdX guest={props.guest.id}/>
        </tr>
    )
}

export default TableRow