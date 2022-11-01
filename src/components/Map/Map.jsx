import React from "react";
import "./Map.css"
import Cell from "../Cell/Cell.jsx"
import Seat from "../Seat/Seat.jsx"
import { get_belongs, get_map } from "../../scripts/main";
import { get_seat } from "../../scripts/main";

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
            cells[rowsCounter-1] = []
            for(var colsCounter = 1; colsCounter <= this.state.columns_number; colsCounter++){
                key++
                cells[rowsCounter-1][colsCounter-1] = <Cell row_number={rowsCounter} col_number={colsCounter} key={key}/>
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
    async componentDidMount(){
        await this.update_map()
        await this.update_seat()
    }
    async update_seat(){
        var seats = await get_seat(this.props.map_name)
        if(this.state.cells.length !== 0){
            var cells = this.state.cells.slice()
            for(let seat of seats){
                var row = cells[seat.row_num-1].slice()
                var prev_cell = row[seat.col_num-1]
                row[seat.col_num-1] = <Seat key={prev_cell.key} number={seat.seat_number} id={seat.id}/>
                cells[seat.row_num-1] = row
            }
            var bel = await get_belongs(this.props.map_name)
            console.log(bel)
            cells = cells.map((corrent_row)=>{
                return corrent_row.map((corrent_seat)=>{
                    var new_seat = corrent_seat
                    for(let corrent_bel of bel){
                        if(corrent_seat.props.id !== undefined){
                            if(corrent_bel.seat === corrent_seat.props.id){
                                new_seat = <Seat key={corrent_seat.key} number={corrent_seat.props.seat_number} id={corrent_seat.props.id} name={corrent_bel.guest_first_name + " " + corrent_bel.guest_last_name}/>
                                console.log(new_seat)
                            }
                        }
                    }
                    return new_seat 
                })
            })
            this.setState({cells:cells})
        }
    }
    render(){
        return (
            <div id="map" className="map"> {this.state.cells} </div>
        )
    }
}

export default Map