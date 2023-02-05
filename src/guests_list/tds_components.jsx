import { useState } from "react"
import { useParams } from "react-router-dom"
import { useSocket } from "../app"
import api from "../scripts/api/api"

export function TdLast(props){

    const [isLastInput, setLastInput] = useState(false)
    const [last, setLast] = useState(props.last_name)
    const hiveSocket = useSocket()
    const {map_name} = useParams()

    function onTdClick(){
        setLastInput(true)
    }

    function onInputBlur(){
        setLastInput(false)
        api.guest.update_last_name(last, props.guest_id)
        .then(()=>{
            var msg = JSON.stringify({action: 'invalidate', quert_key: ['get_guests', map_name]})
            hiveSocket.send(msg)
        })
    }

    function onInputChange(event){
        setLast(event.target.value)
    }

    if(isLastInput){ 
        return (
        <td>
            <input 
                type='text' 
                autoFocus 
                value={last} 
                onBlur={onInputBlur}
                onChange={onInputChange}
            />
        </td>
        )
    }

    return <td onClick={onTdClick}>{last}</td>
}

export function TdFirst(props){

    const [isFirstInput, setFirstInput] = useState(false)
    const [first, setFirst] = useState(props.first_name)
    const hiveSocket = useSocket()
    const {map_name} = useParams()

    function onTdClick(){
        setFirstInput(true)
    }

    function onInputBlur(){
        setFirstInput(false)
        api.guest.update_first_name(first, props.guest_id)
        .then(()=>{
            var msg = JSON.stringify({action: 'invalidate', quert_key: ['get_guests', map_name]})
            hiveSocket.send(msg)
        })
    }

    function onInputChange(event){
        setFirst(event.target.value)
    }

    if(isFirstInput){ 
        return (
        <td>
            <input 
                type='text' 
                autoFocus 
                value={first} 
                onBlur={onInputBlur}
                onChange={onInputChange}
            />
        </td>
        )
    }

    return <td onClick={onTdClick}>{first}</td>
}

export function TdGroup(props){

    const [isGroupInput, setGroupInput] = useState(false)
    const [group, setGroup] = useState(props.group)
    const hiveSocket = useSocket()
    const {map_name} = useParams()

    function onTdClick(){
        setGroupInput(true)
    }

    function onInputBlur(){
        setGroupInput(false)
        api.guest.update_group_name(group, props.guest_id)
        .then(()=>{
            var msg = JSON.stringify({action: 'invalidate', quert_key: ['get_guests', map_name]})
            hiveSocket.send(msg)
        })
    }

    function onInputChange(event){
        setGroup(event.target.value)
    }

    if(isGroupInput){ 
        return (
        <td>
            <input 
                type='text' 
                autoFocus 
                value={group} 
                onBlur={onInputBlur}
                onChange={onInputChange}
            />
        </td>
        )
    }

    return <td onClick={onTdClick}>{group}</td>
}

export function TdScore(props){

    const [isScoreInput, setScoreInput] = useState(false)
    const [score, setScore] = useState(props.score)
    const hiveSocket = useSocket()
    const {map_name} = useParams()

    function onTdClick(){
        setScoreInput(true)
    }

    function onInputBlur(){
        setScoreInput(false)
    }

    function onInputChange(event){
        setScore(event.target.value)
    }

    if(isScoreInput){ 
        return (
        <td>
            <input 
                type='text' 
                autoFocus 
                value={score} 
                onBlur={onInputBlur}
                onChange={onInputChange}
            />
        </td>
        )
    }

    return <td onClick={onTdClick}>{score}</td>
}

export function TdX(props){
 
    function on_td_x(){
        api.guest.delete(props.guest_id)
    }

    return (<td className="td_x" onClick={on_td_x}> x </td>)
}