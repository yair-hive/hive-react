import { Link, useParams } from "react-router-dom";
import { useQuery } from 'react-query'
import api from '../scripts/api/api'
import HiveButton from "../hive_elements/hive_button";
import SelectionArea from '@viselect/react';
import "../style/side_menu.css"
import SideMenu from "../edit_map/side_menu";
import { useEffect, useState } from "react";
import React from "react";
import Map from "../edit_map/map";

export const EditContext = React.createContext('אל תערוך')
export const SelectablesContext = React.createContext(null)
export const MapIdContext = React.createContext(null)
export const ActionsContext = React.createContext(null)
export const TagsPopUpContext = React.createContext(null)

function Maps(){

    let {map_name} = useParams()
    const [editStatus, setEditStatus] = useState('אל תערוך')
    const selecteblsState = useState('cell')
    const actionsState = useState(null)
    const tagsPopState = useState(false)

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

    const  map_res  = useQuery(['get_map', map_name], async ()=>{
        return await api.map.get(map_name)
    })

    const map_id = map_res.data?.id

    return (
        <>
        <ActionsContext.Provider value={actionsState}>
        <EditContext.Provider value={editStatus}>
        <SelectablesContext.Provider value={selecteblsState}>
        <MapIdContext.Provider value={map_id}>
        <TagsPopUpContext.Provider value={tagsPopState}>
            <SelectionArea
                selectables={'.selectable'}
                onStart={onStart}
                onMove={onMove}
                behaviour={{scrolling: {startScrollMargins: {x: 150, y: 0}}}}
                className='selection_bond main_bord'
            >
                <Map />       
            </SelectionArea>
            <div className="side_menu">
                <SideMenu setEditStatus={setEditStatus} />
            </div>
        </TagsPopUpContext.Provider>
        </MapIdContext.Provider>
        </SelectablesContext.Provider>
        </EditContext.Provider>
        </ActionsContext.Provider>
        </>
    )
}

export default Maps