import "./Map_test.css"
import Cell from "../Cell/Cell"
import Seat from "../Seat/Seat"
import React from "react"
import { useState } from "react"

function Map_test(props){
    const [Cells, setCells] = useState([])

    const create_cells = ()=>{
        var cells = []
        var key = 0
        for(var rowsCounter = 1; rowsCounter <= props.rows; rowsCounter++){
            cells[rowsCounter-1] = []
            for(var colsCounter = 1; colsCounter <= props.cols; colsCounter++){
                key++
                if(props.selected.has(key)){
                    cells[rowsCounter-1][colsCounter-1] = <Cell index={key} row_number={rowsCounter} col_number={colsCounter} key={key} selectable={true} selected={true}/> 
                }else{
                    cells[rowsCounter-1][colsCounter-1] = <Cell index={key} row_number={rowsCounter} col_number={colsCounter} key={key} selectable={true} selected={false}/>
                }                
            }                         
        }
        for(let seat of props.seats){ 
            cells = cells.map((row)=>{
                return row.map((cell)=>{
                    if(cell.props){
                        if(cell.props.row_number === Number(seat.row_num)){
                            if(cell.props.col_number === Number(seat.col_num)){
                                return <Seat key={cell.key} number={seat.seat_number} id={seat.id}/>                                       
                            }
                        }
                    }
                    return cell
                })
            })                   
        }
        for(let seat of props.seats){ 
            for(let corrent_bel of props.belongs){
                cells = cells.map((row)=>{
                    return row.map((cell)=>{
                        if(cell.props.id){                     
                            if(corrent_bel.seat === cell.props.id){
                                if(!cell.props.name){
                                    var guest_name = corrent_bel.guest_first_name + " " + corrent_bel.guest_last_name
                                    return <Seat key={cell.key} number={seat.seat_number} id={seat.id} name={guest_name} group={corrent_bel.guest_group}/>
                                }
                            }                                        
                        }
                        return cell
                    })
                })
            }                   
        } 
        return cells
    }

    return(
        <div className="map-container">
            <div id="map" className="map" style={{'--map-rows' : props.rows, '--map-cols' : props.cols}}> {create_cells()} </div>
        </div>
    )
}

export default Map_test