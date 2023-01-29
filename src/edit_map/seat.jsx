import { useContext } from "react"
import { useRef } from "react"
import { EditContext, SelectablesContext } from "../pages/maps"
import "../style/seat.css"

function Seat(props){
    const edit = useContext(EditContext)
    const selecteblsState = useContext(SelectablesContext)

    const nameBoxRef = useRef(null)
    var font_size = '15px'
    if(props.name){
        if(props.name.length > 14) font_size = '11px'
    }
    var color = 'black'
    if(props.color){
        var c = props.color.substring(1);      // strip #
        var rgb = parseInt(c, 16);   // convert rrggbb to decimal
        var r = (rgb >> 16) & 0xff;  // extract red
        var g = (rgb >>  8) & 0xff;  // extract green
        var b = (rgb >>  0) & 0xff;  // extract blue
    
        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
        if (luma < 160) {
            color = 'white'
        }
    }
    function nameBoxOnClick(){
        props.setDropDownPos(nameBoxRef.current)
        props.setDropDownStatus(true)
        props.setSelectedSeat(props.seat_id)
    }
    const NAME_BOX_STYLE = {
        backgroundColor: props.color,
        fontSize: font_size,
        color: color
    }
    function tags_count(){
        if(props.tags){
            var i = 0
            return props.tags.map(tag =>{
                var name = tag.tag_data.tag_name
                var tag_color = tag.tag_data.color
                var color = 'black'
                var c = tag_color.substring(1);      // strip #
                var rgb = parseInt(c, 16);   // convert rrggbb to decimal
                var r = (rgb >> 16) & 0xff;  // extract red
                var g = (rgb >>  8) & 0xff;  // extract green
                var b = (rgb >>  0) & 0xff;  // extract blue
            
                var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
                if (luma < 160) {
                    color = 'white'
                }
                var style = {
                    backgroundColor: tag_color,
                    color: color
                }
                i++
                return(<div key={i} style = {style} className="tag_box">
                    {name}
                </div>)
            })
        }
    }
    function name_box(){
        if(edit === 'ערוך'){
            return(
                <div className="name_box">
                    <div className="tags_cont">
                        {tags_count()}
                    </div>
                </div>
            )
        }
        return(
            <div className="name_box" style={NAME_BOX_STYLE} ref={nameBoxRef} onClick={nameBoxOnClick}>
                {props.name}
            </div>  
        )
    } 
    var className = "seat"
    if(selecteblsState){
        if(selecteblsState[0] === 'seat' && edit == 'ערוך') className = className+" selectable"
    }
    return (<div>
        <div className={className} seat_id={props.seat_id}>
            <div className="num_box">
                {props.number}    
            </div> 
            {name_box()}
        </div>
    </div>)
}

export default Seat