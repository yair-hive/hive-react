import React from "react";
import "./Map.css"
import Cell from "../Cell/Cell.jsx"

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.create_cells = this.create_cells.bind(this)  
    }
    create_cells(){
        var cells = []
        var key = 0
        for(var rowsCounter = 1; rowsCounter <= this.props.rows_number; rowsCounter++){
            for(var colsCounter = 1; colsCounter <= this.props.columns_number; colsCounter++){
                key++
                cells.push(<Cell row_number={rowsCounter} col_number={colsCounter} key={key}/>)
            }
        }
        return cells
    }
    componentDidMount(){
        const map_ele = document.getElementById('map')
        map_ele.style.setProperty('--map-rows', this.props.rows_number)
        map_ele.style.setProperty('--map-cols', this.props.columns_number)
    }
    render(){
        return (
            <div id="map" className="map"> {this.create_cells()} </div>
        )
    }
}

export default Map