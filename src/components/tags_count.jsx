import { useTagsQuery } from "../querys";

function getColor(backColor){
    var color = 'black'
        var c = backColor.substring(1);      // strip #
        var rgb = parseInt(c, 16);   // convert rrggbb to decimal
        var r = (rgb >> 16) & 0xff;  // extract red
        var g = (rgb >>  8) & 0xff;  // extract green
        var b = (rgb >>  0) & 0xff;  // extract blue
    
        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
        if (luma < 160) {
            color = 'white'
        }
        return color
}

function TagsCount(props){
    const tags = useTagsQuery()
    if(props.tags){
        if(tags.data){
            var i = 0
            return (<div className="tags_cont"> {props.tags.map(tag_id =>{
                var tag = tags.data[tag_id.group_id]
                var color = getColor(tag.color)
                var style = {
                    backgroundColor: tag.color,
                    color: color
                }
                i++
                return(<div key={i} style = {style} className="tag_box">
                    {tag.tag_name}
                </div>)
            })} </div>)
        }
    }
}

export default TagsCount