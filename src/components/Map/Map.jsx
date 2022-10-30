import React from "react";
import "./Map.css"
import Cell from "../Cell/Cell.jsx"
import { get_map } from "../../scripts/main";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows_number: 0,
            columns_number: 0 
        }
        this.create_cells = this.create_cells.bind(this)  
        this.update_map = this.update_map.bind(this)
    }
    create_cells(){
        var cells = []
        var key = 0
        for(var rowsCounter = 1; rowsCounter <= this.state.rows_number; rowsCounter++){
            for(var colsCounter = 1; colsCounter <= this.state.columns_number; colsCounter++){
                key++
                cells.push(<Cell row_number={rowsCounter} col_number={colsCounter} key={key}/>)
            }
        }
        return cells
    }
    async update_map(){
        var map_data = await get_map(this.props.map_name)
        this.setState({rows_number: map_data.rows_number, columns_number: map_data.columns_number})
        const map_ele = document.getElementById('map')
        map_ele.style.setProperty('--map-rows', this.state.rows_number)
        map_ele.style.setProperty('--map-cols', this.state.columns_number)
    }
    componentDidMount(){
        this.update_map()
    }
    render(){
        return (
            <div id="map" className="map"> {this.create_cells()} </div>
        )
    }
}

export default Map