import { useState } from "react";
import PopUp from "../hive_elements/pop_up";
import { useTagsData, useTagsDelete, useTagsUpdate } from "../querys/tags";

function ColorInput({tag_id, color}){

    const [colorState, setColor] = useState(null)
    const update_color = useTagsUpdate().color

    function onChange(event){
        setColor(event.target.value)
    }

    function onBlur(){
        update_color({tag_id, color: colorState})
    }

    return(
        <input 
            type={'color'} 
            value={color}
            onChange={onChange}
            onBlur={onBlur}
        />
    )
}

function TdX({tag_id}){

    console.log(tag_id)

    const delete_tag = useTagsDelete()

    function onClick(){
        delete_tag({tag_id})
    }

    return(
        <td className="td_x" onClick={onClick}> X </td>
    )
}

function TagsPop(props) {

    const tags = useTagsData()

    function create_tag_tds(){
        if(tags.data){
            var tr_elements = []
            var new_tags = Object.entries(tags.data)
            for(let [tag_key, tag] of new_tags){
                var tr = <tr key={tag_key}>
                        <TdX tag_id={tag.id}/>
                        <td className="td_color"> <ColorInput color = {tag.color} tag_id={tag.id}/> </td>
                        <td> {tag.score} </td>
                        <td> {tag.name} </td>
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