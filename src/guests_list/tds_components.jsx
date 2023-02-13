import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useSocket } from "../app"
import { useDeleteGuest } from "../mutations"
import { useRequestsQuery } from "../querys"
import api from "../scripts/api/api"
import RequestsCount from "../components/requestsCount"

export function TdLast(props){

    const [isLastInput, setLastInput] = useState(false)
    const [last, setLast] = useState(props.last_name)
    const hiveSocket = useSocket()
    const {map_name} = useParams()

    function onTdClick(){
        setLastInput(true)
    }

    useEffect(()=>{
        setLast(props.last_name)
    }, [props.last_name])

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
        <td style={{
            backgroundColor: 'white'
        }}>
            <input 
                type='text' 
                autoFocus 
                value={last} 
                onBlur={onInputBlur}
                onChange={onInputChange}
                style={{
                    width: `${last.length}ch`
                }}
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

    useEffect(()=> setFirst(props.first_name), [props.first_name])

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
        <td style={{
            backgroundColor: 'white'
        }}>
            <input 
                type='text' 
                autoFocus 
                value={first} 
                onBlur={onInputBlur}
                onChange={onInputChange}
                style={{
                    width: `${first.length}ch`
                }}
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

    useEffect(()=> setGroup(props.group), [props.group])

    function onTdClick(){
        setGroupInput(true)
    }

    function onInputBlur(){
        setGroupInput(false)
        api.guest.update_group_name(group, props.guest_id, map_name)
        .then(()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['get_guests', map_name]})
            hiveSocket.send(msg)
        })
    }

    function onInputChange(event){
        setGroup(event.target.value)
    }

    if(isGroupInput){ 
        return (
        <td style={{
            backgroundColor: 'white'
        }}>
            <input 
                type='text' 
                autoFocus 
                value={group} 
                onBlur={onInputBlur}
                onChange={onInputChange}
                style={{
                    width: `${group.length}ch`
                }}
            />
        </td>
        )
    }

    return <td onClick={onTdClick}>{group}</td>
}
export function TdScore(props){

    const [isScoreInput, setScoreInput] = useState(false)
    const [score, setScore] = useState(props.guest_score + props.group_score)
    const hiveSocket = useSocket()
    const {map_name} = useParams()

    useEffect(()=> setScore(props.guest_score + props.group_score), [props.guest_score, props.group_score])

    function onTdClick(){
        setScoreInput(true)
    }

    function onInputBlur(){
        api.guest.update_guest_score(props.guest_id, (score -props.group_score))
        .then(()=> {
            var msg = JSON.stringify({action: 'invalidate', quert_key: ['get_guests', map_name]})
            hiveSocket.send(msg)
        })
        setScoreInput(false)
    }

    function onInputChange(event){
        setScore(Number(event.target.value))
    }

    if(isScoreInput){ 
        return (
        <td style={{
            backgroundColor: 'white'
        }}>
            <input 
                type='text' 
                autoFocus 
                value={score} 
                onBlur={onInputBlur}
                onChange={onInputChange}
                style={{
                    width: `${score.toString().length}ch`
                }}
            />
        </td>
        )
    }

    return <td onClick={onTdClick}>{score}</td>
}
export function TdX(props){

    const delete_guest = useDeleteGuest()
 
    function on_td_x(){
        delete_guest.mutate({guest_id: props.guest_id})
    }

    return (<td className="td_x" onClick={on_td_x}> x </td>)
}
export function TdRequests(props){

    const requests = useRequestsQuery()
    const tdRef = useRef(null)

    function onClick(event){
        var classList = event.target.classList
        if(!classList.contains('delete')){
            props.setDropPos(tdRef.current)
            props.setSelectedGuest(props.guest_id)
        }
    }

    var requests_object

    if(requests.data){
        requests_object = {}
        requests.data.forEach(request => requests_object[request.guest] = [])
        requests.data.forEach(request => requests_object[request.guest].push(request))
    }

    var this_requests
    if(requests_object) this_requests = requests_object[props.guest_id]

    return (
        <td ref={tdRef} onClick={onClick} className='td_requests'>
            <RequestsCount requests={this_requests}/>
        </td>
    )
}