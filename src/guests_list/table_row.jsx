function TableRow(props){
    var seat_number, belong
    if(props.seat) {
        seat_number = props.seat.seat_number
        belong = 'belong'
    } 
    if(props.seat && props.belongsStatus == 'לא משובצים') return
    if(!props.seat && props.belongsStatus == 'משובצים') return
    if(props.groupsStatus != 'הכל' && props.groupsStatus != props.group.group_name) return
    if(props.tags){
        var tags_names = Object.entries(props.tags)
        tags_names = tags_names.map(e => {
            return e[1].tag_name
        })
        if(props.tagsStatus != 'הכל' && tags_names.indexOf(props.tagsStatus) == -1) return
    }else{
        if(props.tagsStatus != 'הכל') return
    }
    
    var tags_string = ''
    var tags_elements = []
    var i = 0
    if(props.tags) {
        i++
        for(let tag of props.tags){
            var color = 'black'
            var c = tag.color.substring(1);      // strip #
            var rgb = parseInt(c, 16);   // convert rrggbb to decimal
            var r = (rgb >> 16) & 0xff;  // extract red
            var g = (rgb >>  8) & 0xff;  // extract green
            var b = (rgb >>  0) & 0xff;  // extract blue
        
            var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
            if (luma < 160) {
                color = 'white'
            }
            var style = {
                backgroundColor: tag.color,
                color: color
            }
            var element = <div style = {style} className="tag_box" key={i}>
                {tag.tag_name}
            </div>
            tags_elements.push(element)
        }
    }
    props.tags?.map((tag)=> {
        tags_string = tags_string +' | '+ tag
    })
    return(
        <tr>
            <td className={'seat_number'} belong={belong}>{seat_number}</td>
            <td>
                <div className="tags_cont">{tags_elements}</div>
            </td>
            <td>{props.guest.last_name}</td>
            <td>{props.guest.first_name}</td>
            <td>{props.group.group_name}</td>
            <td>{Number(props.guest.score) + Number(props.group.score)}</td>
            <td></td>
            <td className="td_x"> x </td>
        </tr>
    )
}

export default TableRow