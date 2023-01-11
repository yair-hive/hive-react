function TableRow(props){
    var seat_number, seat_td_class
    if(props.seat) {
        seat_number = props.seat.seat_number
        seat_td_class = 'as_number'
    } 
    return(
        <tr>
            <td className={seat_td_class+' seat_number'}>{seat_number}</td>
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