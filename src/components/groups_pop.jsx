import { useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import PopUp from "../hive_elements/pop_up"

function GroupsPop(props){

    const {map_name} = useParams()
    const queryClient = useQueryClient()
    const groups = queryClient.getQueryData(['guests_groups', map_name])

    function create_rows(){
        if(groups){
            var rows = []
            var groups_array = Object.entries(groups)
            for(let [key, group] of groups_array){
                var tr = (<tr key={key}>
                    <td> X </td>
                    <td>
                        <input type='color'value={group.color}/>
                    </td>
                    <td> {group.score} </td>
                    <td> {group.group_name} </td>
                </tr>)
                rows.push(tr)
            }
            return rows
        }
    }

    return (
    <PopUp
        status={props.status} 
        setState = {props.setState}
        title = 'קבוצות'
    >
        <table id="groups_table">
            <thead>
                <tr>
                    <th> X </th>
                    <th> צבע </th>
                    <th> ניקוד </th>
                    <th> שם </th> 
                </tr>
            </thead>
            <tbody>
                {create_rows()}
            </tbody>
        </table>
    </PopUp>)
}

export default GroupsPop