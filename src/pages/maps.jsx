import { Link, useParams } from "react-router-dom";
import { useQuery } from 'react-query'
import MapContainer from "../edit_map/map_container";
import api from '../scripts/api/api'
import HiveButton from "../hive_elements/hive_button";
import "../style/side_menu.css"
import SideMenu from "../edit_map/side_menu";
import { useState } from "react";
import React from "react";

export const EditContext = React.createContext('אל תערוך')
export const SelectablesContext = React.createContext(null)

function Maps(){

    let {map_name} = useParams()
    const [editStatus, setEditStatus] = useState('אל תערוך')
    const selecteblsState = useState('cell')

    const  map_res  = useQuery(['get_map', map_name], async ()=>{
        return await api.map.get(map_name)
    })

    const map_id = map_res.data?.id

    const seats_res = useQuery(['get_seats', map_name], async ()=>{
        return await api.seat.get_all(map_id)
    }, {
        enabled: !!map_id,
        refetchOnMount: false
    })
    const belongs_res = useQuery(['get_belongs', map_name], async ()=>{
        return await api.seat.get_belong(map_id)
    }, {
        enabled: !!map_id,
        refetchOnMount: false
    })
    const guests_res = useQuery(['get_guests', map_name], async ()=>{
        return await api.guest.get_all({map_id: map_id})
    }, {
        enabled: !!map_id,
        refetchOnMount: false
    })
    const guests_groups_res = useQuery(['guests_groups', map_name], async ()=>{
        return await api.guest.get_all_groups(map_id)
    }, {
        enabled: !!map_id,
        refetchOnMount: false
    })
    const tags_res = useQuery(['tags', map_name], async ()=>{
        const map_tags = await api.tags.get_tags({map_id: map_id})
        var new_map_tags = {}
        map_tags.map(tag => {new_map_tags[tag.id] = tag})
        return new_map_tags
    }, {
        enabled: !!map_id,
        refetchOnMount: false
    })
    const tags_belong_res = useQuery(['tags_belong', map_name], async ()=>{
        return await api.tags.get_all_belongs(map_id)
    }, {
        enabled: !!map_id,
        refetchOnMount: false
    })

    return (
        <>
        <EditContext.Provider value={editStatus}>
        <SelectablesContext.Provider value={selecteblsState}>
            <div className='main_bord' id="main_bord">
                <MapContainer 
                    map_res = {map_res} 
                    seats_res = {seats_res} 
                    belongs_res={belongs_res} 
                    guests_res={guests_res} 
                    guests_groups_res = {guests_groups_res}
                    tags_res={tags_res}
                    tags_belong_res={tags_belong_res}
                />
            </div>
            <div className="side_menu">
                <SideMenu
                    map_res = {map_res} 
                    seats_res = {seats_res} 
                    belongs_res={belongs_res} 
                    guests_res={guests_res} 
                    guests_groups_res = {guests_groups_res}
                    tags_res={tags_res}
                    tags_belong_res={tags_belong_res}
                    setEditStatus={setEditStatus}
                />
            </div>
        </SelectablesContext.Provider>
        </EditContext.Provider>
        </>
    )
}

export default Maps