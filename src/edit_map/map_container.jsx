import SelectionArea, {SelectionEvent} from '@viselect/react';
import "./map_cont.css"
import Map from "./map"
import { useState } from 'react';

function MapContainer(){
    const [selected, setSelected] = useState(new Set())
    function extractIds(els){
        return els.map(v => {
            return v.getAttribute('cell_index')})
        .filter(Boolean)
        .map(Number);
    }

    function onStart({event, selection}){
        if (!(event === null || event === void 0 ? void 0 : event.ctrlKey) && !(event === null || event === void 0 ? void 0 : event.metaKey)){
            selection.clearSelection();
            setSelected(() => new Set());
        }
    }
    function onMove({ store: { changed: { added, removed } } }){
        setSelected(prev => {
            const next = new Set(prev);
            added.forEach(ele => ele.classList.add('selected'))
            removed.forEach(ele => ele.classList.remove('selected'))
            extractIds(added).forEach(id => next.add(id));
            extractIds(removed).forEach(id => next.delete(id));
            return next;
        });
    }
    return (<SelectionArea
        selectables=".selectable"
        onStart={onStart}
        onMove={onMove}
        >
        <div className="map_container">
            <Map selected = {selected}></Map>
        </div>
    </SelectionArea>)
}

export default MapContainer