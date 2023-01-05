import "./seat.css"

function Seat(props){
    var font_size = '15px'
    if(props.name){
        if(props.name.length > 15) font_size = '11px'
    }
    const NAME_BOX_STYLE = {
        backgroundColor: props.color,
        fontSize: font_size
    }
    return (<div>
        <div className="seat">
            <div className="num_box">
                {props.number}    
            </div> 
            <div className="name_box" style={NAME_BOX_STYLE}>
                {props.name}
            </div>          
        </div>
    </div>)
}

export default Seat