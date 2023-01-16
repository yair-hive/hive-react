import '../style/drop_down.css'

function DropDown(props){
    if(!props.status) return

    var parent = props.pos
    var parent_width = parent.width
    var list_width_over = 60
    var list_width_over_d = list_width_over / 2
    var drop_down_top = parent.bottom
    var drop_down_width = parent_width + list_width_over
    var drop_down_left = parent.left - list_width_over_d 

    const STYLE = {
        width : drop_down_width+'px',
        top : drop_down_top+'px',
        left : drop_down_left+'px'
    }

    return (<div className="drop_down" style={STYLE}></div>)
}

export default DropDown