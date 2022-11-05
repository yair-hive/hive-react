import "./Map_test.css"
import { get_map, get_seat, get_belongs } from "../../scripts/main"
import Cell from "../Cell/Cell"
import Seat from "../Seat/Seat"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function Map_test(props){
    const [rows, setRows] = useState(0)
    const [cols, setCols] = useState(0)
    const [cells, setCells] = useState([])
    const [selected, setSelected] = useState(new Set())
    let {map_name} = useParams() 

    const create_cells = () => {
        var cells = []
        var key = 0
        for(var rowsCounter = 1; rowsCounter <= rows; rowsCounter++){
            cells[rowsCounter-1] = []
            for(var colsCounter = 1; colsCounter <= cols; colsCounter++){
                key++            
                cells[rowsCounter-1][colsCounter-1] = <Cell index={key} row_number={rowsCounter} col_number={colsCounter} key={key} selectable={true}/>
            }
        }
        return cells
    }

    const update_map = async ()=> {
        var map_data = await get_map(map_name)
        setRows(map_data.rows_number)
        setCols(map_data.columns_number)
        setCells(create_cells())
        const map_ele = document.getElementById('map')
        map_ele.style.setProperty('--map-rows', rows)
        map_ele.style.setProperty('--map-cols', cols)
    }
    const update_seat = async ()=>{
        var seats = await get_seat(map_name)
        if(cells.length !== 0){
            var new_cells = cells.slice()
            for(let seat of seats){
                var row = new_cells[seat.row_num-1].slice()
                var prev_cell = row[seat.col_num-1]
                row[seat.col_num-1] = <Seat key={prev_cell.key} number={seat.seat_number} id={seat.id}/>
                new_cells[seat.row_num-1] = row
            }
            var bel = await get_belongs(map_name)
            new_cells = new_cells.map((corrent_row)=>{
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
            setCells(new_cells)
        }
    }
    useEffect(() => {
        update_map()
    }, [rows])
    useEffect(() => {
        update_map()
    }, [cols])
    useEffect(()=>{
        update_seat()
    })
    return(
        <div id="map" className="map"> {cells} </div>
    )
}

export default Map_test