import SelectionArea from '@viselect/react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { EditContext, SelectablesContext } from '../pages/maps';
import "../style/map_cont.css"
import Map from "./map"

function MapContainer(props){
    const selecteblsState = useContext(SelectablesContext)
    const edit = useContext(EditContext)
    const map_res  = props.map_res
    const seats_res = props.seats_res
    const belongs_res = props.belongs_res 
    const guests_res = props.guests_res
    const guests_groups_res = props.guests_groups_res
    const tags_res = props.tags_res
    const tags_belong_res = props.tags_belong_res
    
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
    function onMousedown(event){
        if(event.keyCode != 13){
            var classList = event.target.classList
            if(!event.ctrlKey && !event.metaKey && !classList.contains('hive-button')){
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
    var selectables = null
    if(selecteblsState){
        selectables = `.${selecteblsState[0]}`
    }
    function SelectionOpt(props){
        if(edit == 'ערוך'){
        return (
            <SelectionArea
                selectables={'.selectable'}
                onStart={onStart}
                onMove={onMove}
            >
                {props.children}
            </SelectionArea>
            )
        }
        return props.children
    }
    return (<SelectionOpt
        >
        <div className="map_container">
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
        </div>
    </SelectionOpt>)
}

export default MapContainer