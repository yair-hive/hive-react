import "./Map_test.css"
import { get_map, get_seat, get_belongs } from "../../scripts/main"
import Cell from "../Cell/Cell"
import Seat from "../Seat/Seat"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import SelectionArea from "@viselect/react";
import React from "react"

function Map_test(props){
    const [rows, setRows] = useState(0)
    const [cols, setCols] = useState(0)
    const [seats, setSeats] = useState([])
    const [belongs, setBelongs] = useState([])
    const [selected, setSelected] = useState(new Set())
    const [status, setStatus] = useState(false)
    let {map_name} = useParams() 

    const extract_cell_data = (els)=>{
        return els.map((v) => {
            var cell_location = {
                index : v.getAttribute("index"),
                row_number : v.getAttribute("cell-row"),
                col_number : v.getAttribute("cell-col")
            }
            return cell_location
        })
    }
    // const onStart = ({ event, selection })=>{
    //     if (!(event === null || event === void 0 ? void 0 : event.ctrlKey) && !(event === null || event === void 0 ? void 0 : event.metaKey)) {
    //         selection.clearSelection();
    //         var new_cells = cells.map((row)=>{
    //             return row.map((cell)=>{
    //                 if(cell.props.selected){
    //                     console.log(cell)
    //                     return React.cloneElement(cell, {selected: false})
    //                 }
    //                 return cell
    //             })
    //         })
    //         console.log(new_cells)
    //         setCells(new_cells)
    //         setSelected([])
    //     }
    //     console.log(cells)
    // };
    // const callbeck = (selected, added, removed)=>{
    //     const next = new Set(selected);
    //     extract_cell_data(added).forEach((cell_data) => next.add(cell_data));
    //     extract_cell_data(removed).forEach((cell_data) => next.delete(cell_data));
    //     var new_cells = cells.map((row) => {
    //         return row.map((cell) => {
    //             for(let corrent of selected){
    //                 if(cell.key === corrent.index){
    //                     return React.cloneElement(cell, {selected: true})
    //                 }
    //             }
    //             return cell
    //         })
    //     })
    //     return {new_selected: next, new_cells: new_cells};
    // }
    // const onMove = ({ store: { changed: { added, removed } } })=>{
    //     var new_selected = selected
    //     var new_callbeck = callbeck(new_selected, added, removed)
    //     setCells(new_callbeck.new_cells)
    //     setSelected(new_callbeck.new_selected)
    // };
    const create_cells = ()=>{
        var cells = []
        var key = 0
        for(var rowsCounter = 1; rowsCounter <= rows; rowsCounter++){
            cells[rowsCounter-1] = []
            for(var colsCounter = 1; colsCounter <= cols; colsCounter++){
                key++ 
                for(let seat of seats){                    
                    if(seat.row_num === rowsCounter && seat.col_num === colsCounter){
                        for(let corrent_bel of belongs){
                            if(corrent_bel.seat === seat.id){
                                var guest_name = corrent_bel.guest_first_name + " " + corrent_bel.guest_last_name
                                cells[rowsCounter-1][colsCounter-1] = <Seat key={key} number={seat.seat_number} id={seat.id} name={guest_name} group={corrent_bel.guest_group}/>
                            }else{
                                cells[rowsCounter-1][colsCounter-1] = <Seat key={key} number={seat.seat_number} id={seat.id}/>
                            }
                        }
                    }
                }
                if(cells[rowsCounter-1][colsCounter-1] === undefined){
                    cells[rowsCounter-1][colsCounter-1] = <Cell index={key} row_number={rowsCounter} col_number={colsCounter} key={key} selectable={true}/>
                }  
            }                         
        }
        return cells
    }

    const update_map = async ()=> {
        var map_data = await get_map(map_name)
        setRows(map_data.rows_number)
        setCols(map_data.columns_number)
        var seats_data = await get_seat(map_name)
        setSeats(seats_data)
        var belongs_data = await get_belongs(map_name)
        setBelongs(belongs_data)
    }
    useEffect(()=>{
        console.log(seats)
        update_map()
    },[rows, cols])
    return(
        // <SelectionArea
        // className="container App-header"
        // onStart={onStart}
        // onMove={onMove}
        // selectables=".selectable"
        // >
            <div className="map-container">
                <div id="map" className="map" style={{'--map-rows' : rows, '--map-cols' : cols}}> {create_cells()} </div>
            </div>
        // </SelectionArea>
    )
}

export default Map_test