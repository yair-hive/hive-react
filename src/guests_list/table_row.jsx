function TableRow(props){
    console.log(props)
    return(
        <tr>
            <td></td>
            <td></td>
            <td>{props.guest.last_name}</td>
            <td>{props.guest.first_name}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    )
}

export default TableRow