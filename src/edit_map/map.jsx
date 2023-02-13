import { useSelection } from '@viselect/react'
import { useContext, useEffect, useState} from 'react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useSocket } from '../app'
import { ActionsContext, EditContext, MapIdContext, SelectablesContext } from '../pages/maps'
import api from '../scripts/api/api'
import AddGuestDropDown from './add_guest_drop_down'
import NewCell from './new_cell'
import { useMapQuery, useSeatsQuery } from '../querys'
import "../style/map_cont.css"
import { useAddNumbers, useAddSeats, useAddTags } from '../mutations'

export const DropContext = React.createContext(null)
export const SelectedContext = React.createContext(null)

function Map(){

    let {map_name} = useParams()

    const map = useMapQuery()
    const seats = useSeatsQuery()

    const [selected_seat, setSelectedSeat] = useState(null)
    const [action, setAction] = useContext(ActionsContext)
    const selection = useSelection()

    const add_seats = useAddSeats()
    const add_numbers = useAddNumbers()
    const add_tags = useAddTags()

    const [dropDownPos, setDropDownPos] = useState(null)
    const edit = useContext(EditContext)
    const selecteblsState = useContext(SelectablesContext)
    const map_id = useContext(MapIdContext)
    const hiveSocket = useSocket()

    if(edit === 'ערוך') {
        if(selection?.enable) selection.enable()
    }
    if(edit === 'אל תערוך') {
        if(selection?.disable) selection.disable()
    }

    function onMousedown(event){
        var classList = event.target.classList
        if(!event.ctrlKey && !event.metaKey && !classList.contains('hive_button')){
            if(!classList.contains('name_box') && !classList.contains('drop_down') && !classList.contains('rolling_list_item')){
                setDropDownPos(false)
            }                               
        }
        if(event.keyCode != 13){
            var classList = event.target.classList
            if(!event.ctrlKey && !event.metaKey && !classList.contains('hive_button')){
                if(!event.target.classList.contains('cell')){
                    document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'))
                }                               
            }
        }
    }
    async function onMapAdd(event){
        if(edit == 'ערוך'){
            if(event.code == 'Enter'){
                if(selecteblsState){
                    if(action == 'seat'){
                        var cells_list = []
                        var selected = document.querySelectorAll('.selected')
                        for(let cell of selected){
                            var cell_data = {}
                            cell_data.row = cell.getAttribute('cell-row') 
                            cell_data.col = cell.getAttribute('cell-col')
                            cells_list.push(cell_data)
                        }
                        add_seats.mutate(cells_list)
                    }
                    if(action == 'numbers'){
                        var col_name = prompt('Please enter number')
                        var seatNumber = Number(col_name) + 1
                        var elements = document.querySelectorAll('.selected')
                        var data = []
                        for(let element of elements){
                            var seat_id = element.getAttribute('seat_id')
                            data.push({id:seat_id, number:seatNumber})     
                            seatNumber++
                        }
                        add_numbers.mutate({data:data})
                    }
                    if(action == 'tags'){
                        var selected = document.querySelectorAll('.selected')
                        var tag_name = prompt('הכנס שם תווית')
                        var seats = []
                        for(let i = 0; i < selected.length; i++){
                            var seat = selected[i]
                            var seat_id = seat.getAttribute('seat_id')
                            seats.push(seat_id)
                        }
                        add_tags.mutate({seats: seats, tag_name:tag_name})
                    }
                }
            }
            if(event.code == 'Delete' && map_id){
                if(action == 'seat'){
                    var selected = document.querySelectorAll('.selected')
                    for(let seat of selected){
                        var seat_id = seat.getAttribute('seat_id')
                        console.log(seat_id)
                        await api.seat.delete(seat_id)
                        await api.seat.delete_belong(seat_id)
                    }
                    var msg = JSON.stringify({action: 'invalidate', quert_key: ['get_seats', map_name]})
                    hiveSocket.send(msg)
                }
            }
        }
    }

    useEffect(()=>{
        document.addEventListener('mousedown', onMousedown)
        document.addEventListener('keydown', onMapAdd)
        return ()=>{
            document.removeEventListener('mousedown', onMousedown)
            document.removeEventListener('keydown', onMapAdd)
        }
    }, [action])

    function new_create_cells(){
        var cells_elements = []
        var list = [] 
        var RCindex = []      
        if(map.data){
            var i = 0
            for(let row = 0; row <= map.data.rows_number; row++){
                RCindex[row] = []
                if(row != 0){
                    for(let col = 0; col <= map.data.columns_number; col++){
                        if(col != 0){
                            RCindex[row][col] = i
                            list[i] = {row: row, col: col}
                            i++
                        }else{
                            RCindex[row][col] = i
                            list[i] = {RC: true, row: row, col: col}
                            i++
                        }
                    }
                }else{
                    for(let col = 0; col <= map.data.columns_number; col++){
                        RCindex[row][col] = i
                        list[i] = {RC: true, row: row, col: col}
                        i++
                    }
                }
            }
        }
        if(map.data && seats.data){
            var i = 0 
            var seats_array = Object.entries(seats.data)
            for(let [key, seat] of seats_array){
                list[RCindex[seat.row_num][seat.col_num]] = seat
                i++
            }
        }
        var i = 0
        for(let cell of list){
            cells_elements.push(<NewCell cell={cell} key={i}/>)
            i++
        }
        return cells_elements
    }

    var STYLE
    if(edit === 'אל תערוך'){
        STYLE = {
            '--map-rows' : map.data?.rows_number, 
            '--map-cols' : map.data?.columns_number
        }
    }
    if(edit === 'ערוך'){
        STYLE = {
            '--map-rows' : Number(map.data?.rows_number)+1, 
            '--map-cols' : Number(map.data?.columns_number)+1
        }
    }

    return (<div className="map_container">
        <SelectedContext.Provider value={[selected_seat, setSelectedSeat]}>
        <DropContext.Provider value={[dropDownPos, setDropDownPos]}>
        <AddGuestDropDown pos={dropDownPos} selected_seat={selected_seat} map={map}/>
            <div id="map" className="map" style={STYLE}> 
                {new_create_cells()}
            </div>
        </DropContext.Provider>
        </SelectedContext.Provider>
    </div>)
}

export default Map