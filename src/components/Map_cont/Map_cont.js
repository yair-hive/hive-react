import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Map_test from "../Map_test/Map_test"
import { get_map, get_seat, get_belongs } from "../../scripts/main"
import SelectionArea from "@viselect/react";

function Map_cont(){
    const [rows, setRows] = useState(0)
    const [cols, setCols] = useState(0)
    const [seats, setSeats] = useState([])
    const [belongs, setBelongs] = useState([])
    const [selected, setSelected] = useState(new Set())

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
            if(seats !== seats_data){
                setSeats(seats_data)
            }            
        })
        get_belongs(map_name).then((belongs_data)=>{
            if(belongs !== belongs_data){
                setBelongs(belongs_data)
            }           
        })
    })
    return (
        <SelectionArea
        className="container App-header"
        onStart={onStart}
        onMove={onMove}
        selectables=".selectable"
        >
            <Map_test rows={rows} cols={cols} seats={seats} belongs={belongs} selected={selected}/>
        </SelectionArea>)
}

export default Map_cont