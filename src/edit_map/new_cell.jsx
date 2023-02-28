import Cell from "./cell"
import MapElement from "./map_element"
import RCselector from "./RCselector"
import Seat from "./seat"

function NewCell(props){
    if(!props.cell) return null
    if(props.cell.name) return <MapElement cell={props.cell}/>
    if(props.cell.id) return <Seat seat_id={props.cell.id} number={props.cell.seat_number} seat={props.cell}/>
    else if(props.cell.RC) return <RCselector />
    else return <Cell row_number={props.cell.row} col_number={props.cell.col}/>
}

export default NewCell