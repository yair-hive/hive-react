import SelectionArea from '@viselect/react';
import { useParams } from 'react-router-dom';
import "../style/map_cont.css"
import MapEdit from './edit';
import Map from "./map"

function MapContainer(props){
    const  map_res  = props.map_res
    const seats_res = props.seats_res
    const belongs_res = props.belongs_res 
    const guests_res = props.guests_res
    const guests_groups_res = props.guests_groups_res
    const tags_res = props.tags_res
    const tags_belong_res = props.tags_belong_res
    const {edit} = useParams()
    
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
    var map = <Map
                map_res = {map_res} 
                seats_res = {seats_res} 
                belongs_res={belongs_res} 
                guests_res={guests_res} 
                guests_groups_res = {guests_groups_res} 
                tags_res={tags_res}
                tags_belong_res={tags_belong_res}
                editStatus={props.editStatus}
            />
    if(edit) map = <MapEdit></MapEdit>
    return (<SelectionArea
        selectables=".selectable"
        onStart={onStart}
        onMove={onMove}
        >
        <div className="map_container">
           {map} 
        </div>
    </SelectionArea>)
}

export default MapContainer