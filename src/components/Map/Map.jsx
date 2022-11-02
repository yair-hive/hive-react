import React from "react";
import "./Map.css"
import Cell from "../Cell/Cell.jsx"
import Seat from "../Seat/Seat.jsx"
import { get_belongs, get_map,  get_seat } from "../../scripts/main";
import SelectionArea from "@viselect/react";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows_number: 0,
            columns_number: 0,
            cells: [],
            selected: new Set()
        }
        this.create_cells = this.create_cells.bind(this)  
        this.update_map = this.update_map.bind(this)
        this.update_seat = this.update_seat.bind(this)
        this.extract_cell_data = this.extract_cell_data.bind(this)
        this.onStart = this.onStart.bind(this)
        this.onMove = this.onMove.bind(this)
        this.callbeck = this.callbeck.bind(this)
    }
    extract_cell_data(els){
        return els.map((v) => {
            var cell_location = {
                index : v.getAttribute("index"),
                row_number : v.getAttribute("cell-row"),
                col_number : v.getAttribute("cell-col")
            }
            return cell_location
        })
    }
    onStart({ event, selection }){
        if (!(event === null || event === void 0 ? void 0 : event.ctrlKey) && !(event === null || event === void 0 ? void 0 : event.metaKey)) {
            selection.clearSelection();
            var new_cells = this.state.cells.map((row)=>{
                return row.map((cell)=>{
                    if(cell.props.selected){
                        return React.cloneElement(cell, {selected: false})
                    }
                    return cell
                })
            })
            this.setState({selected: [], cells: new_cells});
        }
        console.log(this.state.cells)
    };
    callbeck(selected, added, removed){
        const next = new Set(selected);
        this.extract_cell_data(added).forEach((cell_data) => next.add(cell_data));
        this.extract_cell_data(removed).forEach((cell_data) => next.delete(cell_data));
        var new_cells = this.state.cells.map((row) => {
            return row.map((cell) => {
                for(let corrent of selected){
                    if(cell.key === corrent.index){
                        return React.cloneElement(cell, {selected: true})
                    }
                }
                return cell
            })
        })
        return {new_selected: next, new_cells: new_cells};
    }
    onMove({ store: { changed: { added, removed } } }){
        var selected = this.state.selected
        var callbeck = this.callbeck(selected, added, removed)
        this.setState({cells: callbeck.new_cells, selected:callbeck.new_selected})
    };
    create_cells(){
        var cells = []
        var key = 0
        for(var rowsCounter = 1; rowsCounter <= this.state.rows_number; rowsCounter++){
            cells[rowsCounter-1] = []
            for(var colsCounter = 1; colsCounter <= this.state.columns_number; colsCounter++){
                key++            
                cells[rowsCounter-1][colsCounter-1] = <Cell index={key} row_number={rowsCounter} col_number={colsCounter} key={key} selectable={true}/>
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
            cells = cells.map((corrent_row)=>{
                return corrent_row.map((corrent_seat)=>{
                    var new_seat = corrent_seat
                    for(let corrent_bel of bel){
                        if(corrent_seat.props.id !== undefined){
                            if(corrent_bel.seat === corrent_seat.props.id){
                                var guest_name = corrent_bel.guest_first_name + " " + corrent_bel.guest_last_name
                                new_seat = <Seat key={corrent_seat.key} number={corrent_seat.props.number} id={corrent_seat.props.id} name={guest_name} group={corrent_bel.guest_group}/>
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
            <SelectionArea
            className="container App-header"
            onStart={this.onStart}
            onMove={this.onMove}
            selectables=".selectable"
            >
                <div id="map" className="map"> {this.state.cells} </div>
            </SelectionArea>
        )
    }
}

export default Map