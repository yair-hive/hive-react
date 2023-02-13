import { useParams } from "react-router-dom"
import { useSocket } from "../app"
import { useTagsQuery } from "../querys"
import api from "../scripts/api/api"
import '../style/requests_count.css'

function RequestBox({request_id, tag_id}){

    const tags = useTagsQuery()
    const {map_name} = useParams()
    const hiveSocket = useSocket()

    function onClickDelete(){
        api.tag_new.delete_request({request_id: request_id})
        .then(()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ["requests", map_name]})
            hiveSocket.send(msg)
        })
    }

    if(tags.data){
        return (
            <div className="request-box" dir="rtl">
                <span className="delete" onClick={onClickDelete}> x </span>
                <span className="text"> {tags.data[tag_id].tag_name} </span>
            </div>
        )
    }
}

function RequestsCount({requests}){

    function renderRequestsList(){
        const requests_list = []
        if(requests){
            requests.forEach(({id, request}, index) => requests_list.push(<RequestBox request_id={id} tag_id={request} key={index}/>))
        }
        return requests_list
    }

    return (
        <div className="requests-count">
            {renderRequestsList()}
        </div>
    )
}

export default RequestsCount