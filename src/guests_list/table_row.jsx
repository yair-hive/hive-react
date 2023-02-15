import TagsCount from "../components/tags_count"
import { TdFirst, TdGroup, TdLast, TdRequests, TdScore, TdX } from "./tds_components"

function TableRow(props){
    var belong
    var tags_ids = props.tags?.map(tag => tag.group_id)
    if(!props.guest) return
    if(props.seat) belong = 'belong'
    if(props.seat && props.belongsStatus == 'לא משובצים') return
    if(!props.seat && props.belongsStatus == 'משובצים') return
    if(props.groupsStatus != 'הכל' && props.groupsStatus != props.group.group_name) return
    if(props.tagsStatus != 'הכל' && !props.tags) return
    if(props.tagsStatus != 'הכל' && tags_ids?.indexOf(props.tagsStatus) == -1) return

    return(
        <tr>
            <td className={'seat_number'} belong={belong}>{props.seat?.seat_number}</td>
            <td className="td_tags"><TagsCount tags={props.tags}/></td>
            <TdLast last_name={props.guest.last_name} guest_id={props.guest.id}/>
            <TdFirst first_name={props.guest.first_name} guest_id={props.guest.id}/>
            <TdGroup group={props.group.group_name} guest_id={props.guest.id}/>
            <TdScore guest_score={Number(props.guest.score)} group_score={Number(props.group.score)} guest_id={props.guest.id}/>
            <TdRequests guest_id={props.guest.id} setDropPos={props.setDropPos} setSelectedGuest={props.setSelectedGuest}/>
            <TdX guest_id={props.guest.id}/>
        </tr>
    )
}

export default TableRow