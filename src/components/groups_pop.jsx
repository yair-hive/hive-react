import { useEffect, useState } from "react"
import PopUp from "../hive_elements/pop_up"
import { useGuestGroupsData, useGuestGroupsDelete, useGuestGroupsUpdate } from "../querys/guest_groups"

function TdColor({color, group_id}){

    const update_color = useGuestGroupsUpdate().color

    const [colorState, setColorState] = useState(color)

    useEffect(()=> setColorState(color), [color])

    function onInputChenge(event){
        setColorState(event.target.value)
    }

    function onBlur(){
        update_color({group_id, color: colorState})        
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
    const update_score = useGuestGroupsUpdate().score

    useEffect(()=> setScore(score), [score])

    function onChange(event){
        setScore(event.target.value)
    }
    function onBlur(){
        setInput(false)
        update_score({group_id: group_id, score: scoreState})
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

function TdName({name}){
    return <td>{name}</td>
}

function TdX({group_id}){

    const delete_group = useGuestGroupsDelete()

    function onClick(){delete_group(group_id)}

    return <td className="td_x" onClick={onClick}> X </td>
}

function GroupsPop(props){

    const groups = useGuestGroupsData()

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