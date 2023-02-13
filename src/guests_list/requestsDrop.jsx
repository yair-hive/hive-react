import { useParams } from "react-router-dom"
import { useSocket } from "../app"
import DropDown from "../hive_elements/dropDown"
import RollingList from "../hive_elements/rolling_list"
import { useTagsQuery } from "../querys"
import api from "../scripts/api/api"

function RequestsDrop(props){

    const tags = useTagsQuery()
    const {map_name} = useParams()
    const hiveSocket = useSocket()

    function createItems(){
        if(tags.data){
            var tags_array = Object.entries(tags.data)
            var items = []
            for(let [key, tag] of tags_array){
                items.push({name: tag.tag_name, value:tag.id})
            }
            return items
        }
    }

    function onItem(item){
        var data = {
            guest_id: props.selected,
            tag_id: item.value,
            map_name: map_name
        }
        api.tag_new.add_request(data)
        .then(()=>{
            props.setPos(null)
            props.setSelected(null)
            var msg = JSON.stringify({action: 'invalidate', query_key: ['requests', map_name]})
            hiveSocket.send(msg)
        })
    }

    return (
        <DropDown pos={props.pos}>
            <RollingList items={createItems()} onItemClick={onItem}/>
        </DropDown>
    )
}

export default RequestsDrop