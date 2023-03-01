import { useContext } from "react"
import { EditContext, SelectablesContext } from "../app"
import "../style/cell.css"

function PlaseHolder(props){

    const [edit, setEdit] = useContext(EditContext)
    const selecteblsState = useContext(SelectablesContext)

    var selectable = ""

    if(selecteblsState){
        if(selecteblsState[0] === 'cells' && edit == 'ערוך'){
            selectable  = "selectable"
        }
    }

    return (
        <div 
            className = {`cell ${selectable}`} 
            cell-row = {props.row_number} 
            cell-col = {props.col_number}
        /> 
    )
}

export default PlaseHolder