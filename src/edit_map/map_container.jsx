import SelectionArea, {SelectionEvent} from '@viselect/react';
import "./map_cont.css"
import Map from "./map"

function MapContainer(){
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
    return (<SelectionArea
        selectables=".selectable"
        onStart={onStart}
        onMove={onMove}
        >
        <div className="map_container">
            <Map></Map>
        </div>
    </SelectionArea>)
}

export default MapContainer