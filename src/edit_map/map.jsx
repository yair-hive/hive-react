import SelectionArea, { useSelection } from '@viselect/react'
import { useContext, useEffect, useState} from 'react'
import React from 'react'
import { MBloaderContext } from '../app'
import { ActionsContext, EditContext } from '../app'
import AddGuestDropDown from './add_guest_drop_down'
import NewCell from './new_cell'
import "../style/map_cont.css"
import "../style/side_menu.css"
import MBloader from '../hive_elements/MBloader'
import { useSeatsCreate, useSeatsData, useSeatsDelete, useSeatsUpdate } from '../querys/seats'
import { useTagBelongsCreate } from '../querys/tag_belongs'
import { useMapElementsCreate, useMapElementsData, useMapElementsDelete } from '../querys/map_elements'
import { map_add_presers } from './map_add_presers'
import { useMapsData } from '../querys/maps'
import { useSeatBelongsDelete } from '../querys/seat_belongs'
import { map_delete_presers } from './map_delete_presers'

export const DropContext = React.createContext(null)
export const SelectedContext = React.createContext(null)

function Map(){

    const map = useMapsData()
    const seats = useSeatsData()
    const elements = useMapElementsData()

    const [selected_seat, setSelectedSeat] = useState(null)
    const [action, setAction] = useContext(ActionsContext)
    const selection = useSelection()

    const [dropDownPos, setDropDownPos] = useState(null)
    const [edit, setEdit] = useContext(EditContext)

    const [MBloaderStatus, setMBloaderStatus] = useContext(MBloaderContext)

    const seats_create = useSeatsCreate()       
    const tags_create = useTagBelongsCreate()        
    const numbers_update = useSeatsUpdate().numbers
    const elements_create = useMapElementsCreate()

    const seats_delete  = useSeatsDelete()
    const elements_delete = useMapElementsDelete()

    function onStart({event, selection}){
        if (!event.ctrlKey && !event.metaKey){
            selection.clearSelection();
            document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'))
        }
    }
    function onMove({ store: { changed: { added, removed } } }){
        added.forEach(ele => ele.classList.add('selected'))
        removed.forEach(ele => ele.classList.remove('selected'))
    }

    var className='selection_bond main_bord'
    if(MBloaderStatus !== 0 && MBloaderStatus !== 100){
        var mb = document.getElementsByClassName('selection_bond')[0]
        mb.scrollTop = 0
        mb.scrollLeft = 0
        className += ' in_of'
    }

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

    function map_add(){
        const mutations = {   
            seats: seats_create,       
            tags: tags_create,        
            numbers: numbers_update,       
            elements: elements_create,
        }
        return mutations[action](map_add_presers[action]())
    }
    function map_delete(){
        const mutations = {   
            seats: seats_delete,       
            elements: elements_delete,
        }
        return mutations[action](map_delete_presers[action]())
    }
    function onKeyDown(event){
        if(edit === 'ערוך'){
            if(event.code == 'Enter') map_add()           
            if(event.code == 'Delete') map_delete(action)           
        }
    }

    useEffect(()=>{
        document.addEventListener('mousedown', onMousedown)
        document.addEventListener('keydown', onKeyDown)
        return ()=>{
            document.removeEventListener('mousedown', onMousedown)
            document.removeEventListener('keydown', onKeyDown)
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
        if(map.data && elements.data){
            for(let element of elements.data){
                for(let row = element.from_row; row <= element.to_row; row++){
                    for(let col = element.from_col; col <= element.to_col; col++){
                        list[RCindex[row][col]] = null
                    }
                }
                list[RCindex[element.from_row][element.from_col]] = element
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

    return (<SelectionArea
        selectables={'.selectable'}
        onStart={onStart}
        onMove={onMove}
        behaviour={{scrolling: {startScrollMargins: {x: 150, y: 0}}}}
        className={className}
    >
        <MBloader />
        <div className="map_container">
            <SelectedContext.Provider value={[selected_seat, setSelectedSeat]}>
            <DropContext.Provider value={[dropDownPos, setDropDownPos]}>
                <AddGuestDropDown/>
                <div id="map" className="map" style={STYLE}> 
                    {new_create_cells()}
                </div>

            </DropContext.Provider>
            </SelectedContext.Provider>
        </div>
    </SelectionArea>)
}

export default Map