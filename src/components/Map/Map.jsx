import React from "react";
import "./Map.css"
import Cell from "../Cell/Cell.jsx"
import Seat from "../Seat/Seat.jsx"
import { get_map } from "../../scripts/main";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows_number: 0,
            columns_number: 0,
            cells: []
        }
        this.create_cells = this.create_cells.bind(this)  
        this.update_map = this.update_map.bind(this)
        this.update_seat = this.update_seat.bind(this)
    }
    create_cells(){
        var cells = []
        var key = 0
        for(var rowsCounter = 1; rowsCounter <= this.state.rows_number; rowsCounter++){
            cells[rowsCounter-1] = Array()
            for(var colsCounter = 1; colsCounter <= this.state.columns_number; colsCounter++){
                key++
                cells[rowsCounter-1][colsCounter-1] = <Cell row_number={rowsCounter} col_number={colsCounter} key={key} color='#be985f'/>
            }
        }
        return cells
    }
    async update_map(){
        var map_data = await get_map(this.props.map_name)
        this.setState({rows_number: map_data.rows_number, columns_number: map_data.columns_number, cells:this.create_cells()})
        const map_ele = document.getElementById('map')
        map_ele.style.setProperty('--map-rows', this.state.rows_number)
        map_ele.style.setProperty('--map-cols', this.state.columns_number)
    }
    componentDidMount(){
        this.update_map()
    }
    update_seat(){
        var row_number = 2
        var col_number = 5
        var cells = this.state.cells.slice()
        var row = cells[row_number-1].slice()
        var seat = row[col_number-1]
        row[col_number-1] = <Seat key={seat.key}/>
        cells[row_number-1] = row
        this.setState({cells:cells})
        console.log(cells)
    }
    render(){
        return (
            <div id="map" className="map"> {this.state.cells} <button onClick={this.update_seat}> button </button></div>
        )
    }
}

export default Map