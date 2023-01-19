import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { EditContext } from '../pages/maps'
import AddGuestDropDown from './add_guest_drop_down'
import Cell from './cell'
import RowColSelector from './row_col_selector'
import Seat from './seat'

function Map(props){

    const  map_res  = props.map_res
    const seats_res = props.seats_res
    const belongs_res = props.belongs_res 
    const guests_res = props.guests_res
    const guests_groups_res = props.guests_groups_res
    const tags_res = props.tags_res
    const tags_belong_res = props.tags_belong_res

    const [dropDownStatus, setDropDownStatus] = useState(false)
    const [dropDownPos, setDropDownPos] = useState(null)
    const edit = useContext(EditContext)

    function onMousedown(event){
        var classList = event.target.classList
        if(!event.ctrlKey && !event.metaKey && !classList.contains('hive-button')){
            if(!classList.contains('name_box') && !classList.contains('drop_down') && !classList.contains('match_list')){
                setDropDownStatus(false)
            }                               
        }
    }
    useEffect(()=>{
        document.addEventListener('mousedown', onMousedown)
        return ()=> document.removeEventListener('mousedown', onMousedown)
    }, [])

    const create_cells = function(){
        // console.log(guests_res.data)
        if(belongs_res.data){
            var new_belongs = {}
            belongs_res.data.map(bel => {
                new_belongs[bel.seat] = bel
                return bel
            })
            var cells = []
            var key = 0
            for(var rowsCounter = 0; rowsCounter <= map_res.data.rows_number; rowsCounter++){
                if(rowsCounter != 0){
                    for(var colsCounter = 0; colsCounter <= map_res.data.columns_number; colsCounter++){
                        if(colsCounter != 0){
                            if(seats_res.data.length > 0){
                                for(let seat of seats_res.data){
                                    if(seat.row_num == rowsCounter && seat.col_num == colsCounter){
                                        var guest = null
                                        if(new_belongs[seat.id]) guest = new_belongs[seat.id].guest
                                        cells[key]= {row: rowsCounter, col: colsCounter, key: key, seat: {seat_id: seat.id, seat_number: seat.seat_number, belong: guest}}
                                        break;
                                    }else{
                                        cells[key]= {row: rowsCounter, col: colsCounter, key: key, seat: false}
                                    }
                                }
                            }else{
                                cells[key]= {row: rowsCounter, col: colsCounter, key: key, seat: false}
                            }
                        }else{
                            cells[key] = {selector: true, number: rowsCounter, key: key}
                        }
                        key++          
                    }
                }else{
                    for(var colsCounter = 0; colsCounter <= map_res.data.columns_number; colsCounter++){
                        cells[key] = {selector: true, number: colsCounter, key: key}
                        key++
                    }
                }                        
            }
            // console.log(map_res.data)
            // console.log(seats_res.data)
            // console.log(cells)
            return cells
        }
    }

    var STYLE
    if(edit === 'אל תערוך'){
        STYLE = {
            '--map-rows' : map_res.data?.rows_number, 
            '--map-cols' : map_res.data?.columns_number
        }
    }
    if(edit === 'ערוך'){
        STYLE = {
            '--map-rows' : Number(map_res.data?.rows_number)+1, 
            '--map-cols' : Number(map_res.data?.columns_number)+1
        }
    }

    if(map_res.data && seats_res.data && belongs_res.data && guests_res.data && guests_groups_res.data && tags_res.data && tags_belong_res.data){
        return (<>
        <AddGuestDropDown status={dropDownStatus} pos={dropDownPos} guests_res={guests_res}/>
        <div id="map" className="map" style={STYLE}> 
            {create_cells().map(cell => {
                var new_guests = {} 
                guests_res.data.map(gue => {
                    new_guests[gue.id] = gue
                    return gue
                })
                var new_groups = {}
                guests_groups_res.data.map(group => {
                    new_groups[group.id] = group
                    return group
                })
                if(cell.selector){
                    return <RowColSelector 
                        key = {cell.key}
                        number = {cell.number}
                    />
                }
                var new_tags_belong = {}
                tags_belong_res.data.map(bel => {
                    new_tags_belong[bel.seat] = []
                    return bel
                })
                tags_belong_res.data.map(bel => {
                    bel.tag_data = tags_res.data[bel.group_id]
                    new_tags_belong[bel.seat].push(bel)
                    return bel
                })
                // console.log(new_groups)
                if(cell.seat){
                    var guest_name = null
                    var color = null
                    var tags = null
                    if(cell.seat.belong) {
                        var guest = new_guests[cell.seat.belong]
                        if(guest){
                            guest_name = guest.last_name + ' ' + guest.first_name
                            if(guest.guest_group) color = new_groups[guest.guest_group].color
                        }
                    }
                    var seat_tags = new_tags_belong[cell.seat.seat_id] 
                    if(seat_tags) tags = seat_tags
                    // console.log(guest_name)
                    return <Seat 
                                key={cell.key} 
                                number={cell.seat.seat_number} 
                                name={guest_name} 
                                color = {color}
                                tags={tags}
                                setDropDownStatus={setDropDownStatus}
                                setDropDownPos = {setDropDownPos}
                                edit={props.editStatus}
                            />
                }else{
                    return <Cell 
                        row_number={cell.row} 
                        col_number={cell.col} 
                        key={cell.key} 
                        index={cell.key} 
                        selectable={true}
                    />
                }                  
            })} 
        </div>
        </>)
    }
    return 'loading ...'
}

export default Map