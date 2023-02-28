import { useRequestsBelongsDelete } from "../querys/requests_belongs"
import { useTagsData } from "../querys/tags"
import '../style/requests_count.css'

function RequestBox({request_id, tag_id}){

    const tags = useTagsData()
    const delete_request = useRequestsBelongsDelete()

    function onClickDelete(){
        delete_request({request_id})
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