import "./Map_test.css"
import Cell from "../Cell/Cell"
import Seat from "../Seat/Seat"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import api from "../../scripts/api/api"

function Map_test(){

    const [rows, setRows] = useState(0)
    const [cols, setCols] = useState(0)
    const [seats, setSeats] = useState([])
    const [map_id, setMapId] = useState('')

    let {map_name} = useParams()

    
    useEffect(()=>{
        api.map.get(map_name)
        .then((map_data)=>{
            if(rows !== map_data.rows_number){
                setRows(map_data.rows_number)
            } 
            if(cols !== map_data.columns_number){
                setCols(map_data.columns_number)
            } 
            if(map_id !== map_data.id){
                setMapId(map_data.id)
            }        
        })
    })
    useEffect(()=>{
        api.seat.get_all(map_id)
        .then((seats_data)=>{
            if(seats.length !== seats_data.length){
                setSeats(seats_data)
            }            
        })
    }, [map_id])


    const create_cells = function(){
        var cells = []
        var key = 0
        for(var rowsCounter = 1; rowsCounter <= rows; rowsCounter++){
            for(var colsCounter = 1; colsCounter <= cols; colsCounter++){
                if(seats.length > 0){
                    for(let seat of seats){
                        if(seat.row_num == rowsCounter && seat.col_num == colsCounter){
                            cells[key]= {row: rowsCounter, col: colsCounter, key: key, seat: true}
                            break;
                        }else{
                            cells[key]= {row: rowsCounter, col: colsCounter, key: key, seat: false}
                        }
                    }
                }else{
                    cells[key]= {row: rowsCounter, col: colsCounter, key: key, seat: false}
                }
                key++          
            }                         
        }
        return cells
    }
    return(
        <div className="map-container">
            <div id="map" className="map" style={{'--map-rows' : rows, '--map-cols' : cols}}> 
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