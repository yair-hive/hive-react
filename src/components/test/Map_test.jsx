import "./Map_test.css"
import Cell from "../Cell/Cell"
import Seat from "../Seat/Seat"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"

function Map_test(props){
    const create_cells = function(){
        var cells = []
        var key = 0
        for(var rowsCounter = 1; rowsCounter <= props.rows; rowsCounter++){
            for(var colsCounter = 1; colsCounter <= props.cols; colsCounter++){
                for(let seat of props.seats){
                    if(seat.row_num == rowsCounter && seat.col_num == colsCounter){
                        cells[key]= {row: rowsCounter, col: colsCounter, key: key, seat: true}
                        break;
                    }else{
                        cells[key]= {row: rowsCounter, col: colsCounter, key: key, seat: false}
                    }
                }
                key++          
            }                         
        }
        return cells
    }
    return(
        <div className="map-container">
            <div id="map" className="map" style={{'--map-rows' : props.rows, '--map-cols' : props.cols}}> 
                {create_cells().map(cell => { 
                    if(cell.seat){
                        return <Seat key={cell.key}/>
                    }else{
                        return <Cell row_number={cell.row} col_number={cell.col} key={cell.key}/>
                    }                  
                })} 
            </div>
        </div>
    )
}

export default Map_test