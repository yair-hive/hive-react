import "./Map_test.css"
import Cell from "../Cell/Cell"
import Seat from "../Seat/Seat"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"

function Map_test(props){
    return(
        <div className="map-container">
            <div id="map" className="map" style={{'--map-rows' : props.rows, '--map-cols' : props.cols}}>{props.cells} </div>
        </div>
    )
}

export default Map_test