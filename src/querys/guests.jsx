import { useMutation, useQueryClient, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { useSocket } from "../app"
import new_api from "../new_api/new_api"

export function useGuestsData(){
    const {project_name} = useParams()
    return useQuery(['guests', {project_name}], new_api.guests.get_all)
}
export function useGuestsCreate(){
    const {project_name} = useParams()
    const hiveSocket = useSocket()
    const mutation = useMutation(guests =>{
        guests = JSON.stringify(guests)
        return new_api.guests.create(guests, project_name)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['guests', {project_name}]})
            hiveSocket.send(msg)
            var msg = JSON.stringify({action: 'invalidate', query_key: ['groups', {project_name}]})
            hiveSocket.send(msg)
        }
    })
    return mutation.mutateAsync
}
export function useGuestsDelete(){
    const {project_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()
    
    const mutation = useMutation(({guest_id}) => {
        return new_api.guests.delete(guest_id)
    }, {
        onMutate: (variables)=>{
            queryClient.setQueryData(['guests', {project_name}], old => {
                old.forEach((guest, index)=>{
                    if(guest.id === variables.guest_id){
                        old.splice(index, 1)
                    }
                })
                return old
            })
        },
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['guests', {project_name}]})
            hiveSocket.send(msg)
        }
    })
    return mutation.mutate  
}
export function useGuestsUpdate(){
    const {project_name} = useParams()
    const hiveSocket = useSocket()

    var last = useMutation(({guest_id, last}) => {
        return new_api.guests.update.last(guest_id, last)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['guests', project_name]})
            hiveSocket.send(msg)

        }
    })
    var first = useMutation(({guest_id, first}) => {
        return new_api.guests.update.first(guest_id, first)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['guests', project_name]})
            hiveSocket.send(msg)

        }
    })
    var group = useMutation(({guest_id, group}) => {
        return new_api.guests.update.group(guest_id, group, project_name)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['guests', project_name]})
            hiveSocket.send(msg)

        }
    }) 
    var score = useMutation(({guest_id, score}) => {
        return new_api.guests.update.score(guest_id, score)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['guests', project_name]})
            hiveSocket.send(msg)

        }
    })
    return {
        last: last.mutate, 
        first: first.mutate, 
        group: group.mutate, 
        score: score.mutate
    }
}
