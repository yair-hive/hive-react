import PlaseHolder from "./plase_holder"
import GroupElement from "./group_element"
import MapElement from "./map_element"
import RCselector from "./RCselector"
import Seat from "./seat"

function Cell(props){
    if(!props.cell) return null
    if(props.cell.type === 'element') return <MapElement cell={props.cell}/>
    if(props.cell.type === 'group') return <GroupElement cell={props.cell}/>
    if(props.cell.type === 'seat') return <Seat seat_id={props.cell.id} number={props.cell.seat_number} seat={props.cell}/>
    if(props.cell.type === 'RC') return <RCselector />
    if(props.cell.type === 'plase_holder') return <PlaseHolder row_number={props.cell.row} col_number={props.cell.col}/>
}

export default Cell