import React from "react";
import "./Seat.css"

class Seat extends React.Component{
    render(){
        return (
            <div>
                <div className="seat">
                    <div className="num_box">
                        {this.props.number}    
                    </div> 
                    <div className="name_box">
                        {this.props.name}
                    </div>          
                </div>
            </div>)
    }
}

export default Seat