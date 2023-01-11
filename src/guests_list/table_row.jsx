function TableRow(props){
    var seat_number, belong
    if(props.seat) {
        seat_number = props.seat.seat_number
        belong = 'belong'
    } 
    if(props.seat && props.belongsStatus == 'לא משובצים') return
    if(!props.seat && props.belongsStatus == 'משובצים') return
    return(
        <tr>
            <td className={'seat_number'} belong={belong}>{seat_number}</td>
            <td></td>
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