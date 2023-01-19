import { useContext } from "react"
import { EditContext, SelectablesContext } from "../pages/maps"
import "../style/cell.css"

function Cell(props){

    const edit = useContext(EditContext)
    const selecteblsState = useContext(SelectablesContext)

    var class_rows = `row-${props.row_number}`
    var class_cols = `col-${props.col_number}`
    var selectable = ""
    var selected = ""

    if(selecteblsState){
        if(selecteblsState[0] === 'cell' && edit == 'ערוך'){
            selectable  = "selectable"
        }
    }

    var class_name_string = `${class_rows} ${class_cols} cell ${selectable} ${selected}`

    return (
        <div className={class_name_string} 
        cell-row = {props.row_number} 
        cell-col = {props.col_number}
        cell_index={props.index}> 
        </div>
    )
}

export default Cell