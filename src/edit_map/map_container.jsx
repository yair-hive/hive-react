import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { EditContext, SelectablesContext } from '../pages/maps';
import "../style/map_cont.css"
import Map from "./map"

function MapContainer(props){
    const edit = useContext(EditContext)
    const map_res  = props.map_res
    const seats_res = props.seats_res
    const belongs_res = props.belongs_res 
    const guests_res = props.guests_res
    const guests_groups_res = props.guests_groups_res
    const tags_res = props.tags_res
    const tags_belong_res = props.tags_belong_res
    
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

    return (<div className="map_container">
            <Map
                map_res = {map_res} 
                seats_res = {seats_res} 
                belongs_res={belongs_res} 
                guests_res={guests_res} 
                guests_groups_res = {guests_groups_res} 
                tags_res={tags_res}
                tags_belong_res={tags_belong_res}
                editStatus={props.editStatus}
            />
        </div>)
}

export default MapContainer