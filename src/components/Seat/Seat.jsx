import React from "react";
import "./Seat.css"

class Seat extends React.Component{
    render(){
        return (
            <div>
                <div className="seat">
                    <div className="num_box"></div> 
                    <div className="name_box"></div>          
                </div>
            </div>)
    }
}

export default Seat