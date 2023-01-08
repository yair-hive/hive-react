import "./cell.css"

function Cell(props){
    var class_rows = `row-${props.row_number}`
    var class_cols = `col-${props.col_number}`
    var selectable = ""
    var selected = ""
    if(props.selectable){
        selectable = "selectable"
    }
    if(props.selected){
        selected= "selected"
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