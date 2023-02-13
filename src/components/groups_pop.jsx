import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import { useSocket } from "../app"
import PopUp from "../hive_elements/pop_up"
import { useGroupsQuery } from "../querys"
import api from "../scripts/api/api"

function TdColor({color, group_id}){

    const hiveSocket = useSocket()
    const {map_name} = useParams()
    const queryClient = useQueryClient()

    const [colorState, setColorState] = useState(color)

    useEffect(()=> setColorState(color), [color])

    function onInputChenge(event){
        setColorState(event.target.value)
    }

    function onBlur(){
        api.guest.update_group_color(group_id, colorState)
        .then(()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['groups', map_name]})
            hiveSocket.send(msg)
        })
    }

    return (
        <td>
            <input type='color' value={colorState} onChange={onInputChenge} onBlur={onBlur}/>
        </td>
    )
}

function TdScore({score, group_id}){

    const [isInput, setInput] = useState(false)
    const [scoreState, setScore] = useState(score)
    const hiveSocket = useSocket()
    const {map_name} = useParams()
    const queryClient = useQueryClient()

    useEffect(()=> setScore(score), [score])

    function onChange(event){
        setScore(event.target.value)
    }
    function onBlur(){
        setInput(false)
        api.guest.update_group_score(group_id, scoreState)
        .then(()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['groups', map_name]})
            hiveSocket.send(msg)
        })
    }

    if(isInput) return (
        <td style={{backgroundColor: 'white'}}>
            <input 
                value={scoreState}
                style={{width: `${scoreState.toString().length}ch`}}
                onChange={onChange}
                onBlur={onBlur}
            />
        </td>
    )

    return (
        <td onClick={()=> setInput(true)}> 
            {scoreState} 
        </td>
    )
}

function TdName({name, group_id}){

    const [isInput, setInput] = useState(false)
    const [nameState, setName] = useState(name)
    const hiveSocket = useSocket()
    const {map_name} = useParams()

    useEffect(()=> setName(name), [name])

    function onChange(event){
        setName(event.target.value)
    }
    function onBlur(){
        setInput(false)
        api.guest.update_group_name(nameState, group_id, map_name)
        .then(()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['groups', map_name]})
            hiveSocket.send(msg)
        })
    }

    if(isInput) return (
        <td style={{backgroundColor: 'white'}}>
            <input 
                value={nameState}
                style={{width: `${nameState.toString().length}ch`}}
                onChange={onChange}
                onBlur={onBlur}
            />
        </td>
    )

    return (
        <td onClick={()=> setInput(true)}> 
            {name} 
        </td>
    )
}

function TdX({group_id}){

    const hiveSocket = useSocket()
    const {map_name} = useParams()

    function onClick(){
        api.guest.delete_group(group_id)
        .then(()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['groups', map_name]})
            hiveSocket.send(msg)
        })
    }

    return(
        <td className="td_x" onClick={onClick}> X </td>
    )
}

function GroupsPop(props){

    const groups = useGroupsQuery()

    function create_rows(){
        if(groups.data){
            var rows = []
            var groups_array = Object.entries(groups.data)
            for(let [key, group] of groups_array){
                var tr = (<tr key={key}>
                    <TdX group_id={group.id}/>
                    <TdColor color={group.color} group_id={group.id}/>
                    <TdScore score={group.score} group_id={group.id}/>
                    <TdName name={group.group_name} group_id={group.id}/>
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