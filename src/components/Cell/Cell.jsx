import React from "react";
import "./Cell.css"

class Cell extends React.Component {
    render(){
        var class_rows = `row-${this.props.row_number}`
        var class_cols = `col-${this.props.col_number}`
        var class_name_string = class_rows + ' ' + class_cols + ' cell'
        return (
            <div><div className={class_name_string}> </div> <br/></div>
        )
    }
}

export default Cell