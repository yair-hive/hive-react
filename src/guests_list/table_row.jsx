function TableRow(props){
    console.log(props.tags)
    var seat_number, belong
    if(props.seat) {
        seat_number = props.seat.seat_number
        belong = 'belong'
    } 
    if(props.seat && props.belongsStatus == 'לא משובצים') return
    if(!props.seat && props.belongsStatus == 'משובצים') return
    if(props.groupsStatus == 'הכל' || props.groupsStatus == props.group.group_name)
    var tags_string = ''
    props.tags?.map((tag)=> {
        tags_string = tags_string +' | '+ tag
    })
    return(
        <tr>
            <td className={'seat_number'} belong={belong}>{seat_number}</td>
            <td>{tags_string}</td>
            <td>{props.guest.last_name}</td>
            <td>{props.guest.first_name}</td>
            <td>{props.group.group_name}</td>
            <td>{Number(props.guest.score) + Number(props.group.score)}</td>
            <td></td>
            <td className="td_x"> x </td>
        </tr>
    )
}

export default TableRow