import React from "react";
import "./Cell.css"

class Cell extends React.Component {
    render(){
        var class_rows = `row-${this.props.row_number}`
        var class_cols = `col-${this.props.col_number}`
        var selectable = ""
        var selected = ""
        if(this.props.selectable){
            selectable = "selectable"
        }
        if(this.props.selected){
            selected= "selected"
        }
        var class_name_string = class_rows + ' ' + class_cols + ' cell' + ' ' + selectable + ' ' + selected

        return (
            <div className={class_name_string} 
            cell-row = {this.props.row_number} 
            cell-col = {this.props.col_number}
            index={this.props.index}> 
            </div>
        )
    }
}

export default Cell