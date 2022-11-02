import React from "react";
import "./Seat.css"

class Seat extends React.Component{
    render(){
        const GROUPS_COLOR = {
            'א': 'rgb(25, 180, 64)',
            'ב': 'rgb(180, 25, 115)'
        }
        const NAME_BOX_STYLE = {
            backgroundColor: GROUPS_COLOR[this.props.group]
        }
        return (
            <div>
                <div className="seat">
                    <div className="num_box">
                        {this.props.number}    
                    </div> 
                    <div className="name_box" style={NAME_BOX_STYLE}>
                        {this.props.name}
                    </div>          
                </div>
            </div>)
    }
}

export default Seat