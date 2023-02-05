import { useSelection } from '@viselect/react'
import { useContext, useEffect, useState, useReducer } from 'react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useSocket } from '../app'
import { ActionsContext, EditContext, MapIdContext, SelectablesContext } from '../pages/maps'
import api from '../scripts/api/api'
import AddGuestDropDown from './add_guest_drop_down'
import NewCell from './new_cell'
import { useMapQuery, useSeatsQuery } from '../querys'
import "../style/map_cont.css"

export const DropContext = React.createContext(null)

function cells_reducer(state, action){
    var list = []
    var RCindex = []
    var i = 0
    if(action.type === 'create_array'){
        for(let row = 0; row <=  action.rows; row++){
            RCindex[row] = []
            if(row != 0){
                for(let col = 0; col <= action.cols; col++){
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
                for(let col = 0; col <= action.cols; col++){
                    RCindex[row][col] = i
                    list[i] = {RC: true, row: row, col: col}
                    i++
                }
            }
        }
        return ({
            rows: action.rows,
            cols: action.cols,
            list: list,
            RCindex: RCindex
        })
    }
    if(action.type === 'add_seats'){
        var new_arr = state.list.slice()
        var i = 0 
        var seats_array = Object.entries(action.seats)
        for(let [key, seat] of seats_array){
            new_arr[state.RCindex[seat.row_num][seat.col_num]] = seat
            i++
        }
        state.list = new_arr
        return state
    }
}

function Map(){

    let {map_name} = useParams()

    const map = useMapQuery()
    const seats = useSeatsQuery()

    const [selected_seat, setSelectedSeat] = useState(null)
    const [action, setAction] = useContext(ActionsContext)
    const [cells_list, dispatch] = useReducer(cells_reducer, {})
    const selection = useSelection()

    const [dropDownPos, setDropDownPos] = useState(null)
    const edit = useContext(EditContext)
    const selecteblsState = useContext(SelectablesContext)
    const map_id = useContext(MapIdContext)
    const hiveSocket = useSocket()

    function onMousedown(event){
        if(event.keyCode != 13){
            var classList = event.target.classList
            if(!event.ctrlKey && !event.metaKey && !classList.contains('hive_button')){
                if(!event.target.classList.contains('cell')){
                    document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'))
                }                               
            }
        }
    }
    useEffect(()=>{
        document.addEventListener('mousedown', onMousedown)
        return ()=> document.removeEventListener('mousedown', onMousedown)
    }, [])

    useEffect(()=>{
        if(edit == 'ערוך') {
            if(selection.enable) selection.enable()
        }
        if(edit == 'אל תערוך') {
            if(selection.disable) selection.disable()
        }
    }, [edit])

    useEffect(()=>{

        function onMousedown(event){
            var classList = event.target.classList
            if(!event.ctrlKey && !event.metaKey && !classList.contains('hive_button')){
                if(!classList.contains('name_box') && !classList.contains('drop_down') && !classList.contains('rolling_list_item')){
                    setDropDownPos(false)
                }                               
            }
        }
        async function onMapAdd(event){
            if(event.code == 'Enter' && map_id){
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
                        var data = JSON.stringify(cells_list)
                        await api.seat.create_multiple(map_id, data)
                        // queryClient.invalidateQueries(['get_seats', map_name])
                        var msg = JSON.stringify({action: 'invalidate', quert_key: ['get_seats', map_name]})
                        hiveSocket.send(msg)
                    }
                    if(action == 'numbers'){
                        var col_name = prompt('Please enter number')
                        var seatNumber = Number(col_name) + 1
                        var elements = document.querySelectorAll('.selected')
                        for(let element of elements){
                            var seat_id = element.getAttribute('seat_id')
                            await api.seat.create_number(seat_id, seatNumber)     
                            seatNumber++
                        }
                        var msg = JSON.stringify({action: 'invalidate', quert_key: ['get_seats', map_name]})
                        hiveSocket.send(msg)
                    }
                    if(action == 'tags'){
                        var selected = document.querySelectorAll('.selected')
                        var group_name = prompt('הכנס שם תווית')
                        for(let i = 0; i < selected.length; i++){
                            var seat = selected[i]
                            var seat_id = seat.getAttribute('seat_id')
                            api.tags.add(seat_id, group_name, map_id).then(()=>{
                                var msg = JSON.stringify({action: 'invalidate', quert_key: ['tags', map_name]})
                                hiveSocket.send(msg)
                                var msg = JSON.stringify({action: 'invalidate', quert_key: ['tags_belong', map_name]})
                                hiveSocket.send(msg)
                            })
                        }
                    }
                }
            }
            if(event.code == 'Delete' && map_id){
                if(action == 'numbers'){
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

        document.addEventListener('mousedown', onMousedown)
        document.addEventListener('keydown', onMapAdd)
        return ()=>{
            document.removeEventListener('mousedown', onMousedown)
            document.removeEventListener('keydown', onMapAdd)
        }
    }, [])

    function new_create_cells(){
        var cells_elements = []
        var i = 0
        if(typeof cells_list.list == 'object'){
            for(let cell of cells_list.list){
                cells_elements.push(<NewCell cell={cell} key={i}/>)
                i++
            }
            return cells_elements
        }
    }

    useEffect(()=>{
        if(map.data){
            dispatch({
                type: 'create_array',
                rows: map.data.rows_number,
                cols: map.data.columns_number
            })
        }
    }, [map.data])

    useEffect(()=>{
        if(seats.data && map.data){
            dispatch({
                type: 'add_seats',
                seats: seats.data
            })
        }
    }, [seats.data, map.data])

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
            <DropContext.Provider value={[dropDownPos, setDropDownPos]}>
            <AddGuestDropDown pos={dropDownPos} selected_seat={selected_seat} map={map}/>
                <div id="map" className="map" style={STYLE}> 
                    {new_create_cells()}
                </div>
            </DropContext.Provider>
        </div>)
}

export default Map