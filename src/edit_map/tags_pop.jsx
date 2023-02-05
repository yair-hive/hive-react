import { useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useSocket } from "../app";
import PopUp from "../hive_elements/pop_up";
import { useTagsQuery } from "../querys";
import api from "../scripts/api/api";

function ColorInput(props){

    const [color, setColor] = useState(null)
    const hiveSocket = useSocket()
    const {map_name} = useParams()

    function onChange(event){
        setColor(event.target.value)
    }

    function onBlur(){
        console.log(color)
        api.tags.update_color(props.tag_id, color)
        .then(()=> {
            var msg = JSON.stringify({action: 'invalidate', quert_key: ['tags', map_name]})
            hiveSocket.send(msg)
        })
    }

    return(
        <input 
            type={'color'} 
            value={props.color}
            onChange={onChange}
            onBlur={onBlur}
        />
    )
}

function TagsPop(props) {

    const tags = useTagsQuery()

    function create_tag_tds(){
        if(tags.data){
            var tr_elements = []
            var new_tags = Object.entries(tags.data)
            for(let [tag_key, tag] of new_tags){
                var tr = <tr key={tag_key}>
                        <td className="td_x"> X </td>
                        <td className="td_color"> <ColorInput color = {tag.color} tag_id={tag.id}/> </td>
                        <td> {tag.score} </td>
                        <td> {tag.tag_name} </td>
                    </tr>
                tr_elements.push(tr)
            }
            return tr_elements
        }
        return 'loading...'

    }
    return (
    <PopUp 
    status={props.status} 
    setState = {props.setState}
    title = 'תגיות'
    >
        <table id="tags_table">
            <tbody>
            <tr>
                <th> X </th>
                <th> צבע </th>
                <th> ניקוד </th>
                <th> שם </th>
            </tr>
            {create_tag_tds()}
            </tbody>
        </table>
    </PopUp>
    );
}

export default TagsPop;