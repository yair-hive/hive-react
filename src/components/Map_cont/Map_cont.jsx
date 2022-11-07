import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Map_test from "../Map_test/Map_test"
import { get_map, get_seat, get_belongs } from "../../scripts/main"
import SelectionArea from "@viselect/react";
import Cell from "../Cell/Cell"
import Seat from "../Seat/Seat"

function Map_cont(){
    const [rows, setRows] = useState(0)
    const [cols, setCols] = useState(0)
    const [cells, setCells] = useState([])
    const [seats, setSeats] = useState([])
    const [belongs, setBelongs] = useState([])
    const [selected, setSelected] = useState(new Set())

    let {map_name} = useParams()

    const create_cells = ()=>{
        var cells = []
        var key = 0
        for(var rowsCounter = 1; rowsCounter <= rows; rowsCounter++){
            cells[rowsCounter-1] = []
            for(var colsCounter = 1; colsCounter <= cols; colsCounter++){
                key++
                if(selected.has(key.toString())){
                    cells[rowsCounter-1][colsCounter-1] = <Cell index={key} row_number={rowsCounter} col_number={colsCounter} key={key} selectable={true} selected={true}/> 
                }else{
                    cells[rowsCounter-1][colsCounter-1] = <Cell index={key} row_number={rowsCounter} col_number={colsCounter} key={key} selectable={true} selected={false}/>
                }                
            }                         
        }
        for(let seat of seats){ 
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
        for(let seat of seats){ 
            for(let corrent_bel of belongs){
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

    const extract_cell_data = (els)=>{
        return els.map((v) => {
            return v.getAttribute("index")
        })
    }
    const onStart = ({ event, selection })=>{
        if (!(event === null || event === void 0 ? void 0 : event.ctrlKey) && !(event === null || event === void 0 ? void 0 : event.metaKey)) {
            selection.clearSelection();
            setSelected(new Set())     
        }
    };
    const onMove = ({ store: { changed: { added, removed } } })=>{
        setSelected((prev)=>{
            var new_selected = new Set(prev);
            extract_cell_data(added).forEach((cell_data) => new_selected.add(cell_data));
            extract_cell_data(removed).forEach((cell_data) => new_selected.delete(cell_data));
            return new_selected
        })
    };

    useEffect(()=>{
        get_map(map_name).then((map_data)=>{
            if(rows !== map_data.rows_number){
                setRows(map_data.rows_number)
            } 
            if(cols !== map_data.columns_number){
                setCols(map_data.columns_number)
            }         
        })
        get_seat(map_name).then((seats_data)=>{
            if(seats.length !== seats_data.length){
                setSeats(seats_data)
            }            
        })
        get_belongs(map_name).then((belongs_data)=>{
            if(belongs.length !== belongs_data.length){
                setBelongs(belongs_data)
            }           
        })
        var new_cells = create_cells()
        if(cells.length !== new_cells.length){
            setCells(new_cells)
        }
    })
    useEffect(()=>{
        var new_cells = create_cells()
        setCells(new_cells)
    }, [selected])
    return (
        <SelectionArea
        className="container App-header"
        onStart={onStart}
        onMove={onMove}
        selectables=".selectable"
        >
            <Map_test rows={rows} cols={cols} seats={seats} belongs={belongs} selected={selected} cells={cells}/>
        </SelectionArea>)
}

export default Map_cont