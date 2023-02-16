import SelectionArea from '@viselect/react';
import "../style/side_menu.css"
import SideMenu from "../edit_map/side_menu";
import { useContext, useState } from "react";
import { EditContext, MBloaderContext } from "../app";
import React from "react";
import Map from "../edit_map/map";
import MBloader from "../hive_elements/MBloader";

function Maps(){

    

    return (
        <>
        <Map />
        <SideMenu />
        </>
    )
}

export default Maps