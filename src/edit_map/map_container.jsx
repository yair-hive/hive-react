import SelectionArea from '@viselect/react';
import { useParams } from 'react-router-dom';
import "../style/map_cont.css"
import MapEdit from './edit';
import Map from "./map"

function MapContainer(){
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
    var map = <Map></Map>
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