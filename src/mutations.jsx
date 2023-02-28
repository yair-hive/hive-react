import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { MBloaderContext, useSocket } from "./app";
import { map_add_presers } from "./edit_map/map_add_presers";
import { map_delete_presers } from "./edit_map/map_delete_presers";
import new_api from "./new_api/new_api";
import api from "./scripts/api/api";

export function useMapAdd(){

    const {map_name, project_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()

    const mutations = {   
        seats: useMutation(seats => {
            seats = JSON.stringify(seats)
            return api.seat_new.create_multiple(map_name, seats, project_name)
        }, {
            onSuccess: ()=>{
                var msg = JSON.stringify({action: 'invalidate', query_key: ['seats', {map_name: map_name, project_name: project_name}]})
                hiveSocket.send(msg)
    
            }
        }),       
        tags: useMutation(({seats, tag_name}) => {
            seats = JSON.stringify(seats)
            return api.tag_new.add_multiple(seats, tag_name, map_name, project_name)
        }, {
            onSuccess: ()=>{
                queryClient.invalidateQueries(['tags', map_name])
                queryClient.invalidateQueries(['tags_belongs', map_name])
            }
        }),        
        numbers: useMutation(({data}) => {
            data = JSON.stringify(data)
            return api.seat_new.create_multiple_numbers(data)
        }, {
            onSuccess: ()=>{
                queryClient.invalidateQueries(['seats', map_name])
            }
        }),       
        elements: useMutation(({data}) => {
            const {name, from_row, from_col, to_row, to_col} = data
            return api.elements.add(name, from_row, from_col, to_row, to_col, map_name)
        }, {
            onSuccess: ()=>{
                queryClient.invalidateQueries(['elements', map_name])
            }
        })
    }
    return  function(action){
        return mutations[action].mutate(map_add_presers[action]())
    }
}

export function useMapDelete(){

    const {map_name, project_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()

    const mutations = {   
        seats: useMutation(seats_ids => {
            seats_ids = JSON.stringify(seats_ids)
            return api.seat_new.delete_multiple(seats_ids)
        }, {
            onSuccess: ()=>{
                var msg = JSON.stringify({action: 'invalidate', query_key: ['seats', map_name]})
                hiveSocket.send(msg)   
            }
        }),       
        elements: useMutation((elements_ids) => {
            elements_ids = JSON.stringify(elements_ids)
            return api.elements.delete_multiple(elements_ids)
        }, {
            onSuccess: ()=>{
                queryClient.invalidateQueries(['elements', map_name])
            }
        }),
        tags: 'TODO',        
        numbers: 'TODO',
    }
    return  function(action){
        return mutations[action].mutate(map_delete_presers[action]())
    }
}


export function useCreateGuests(){
    const {map_name, project_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()
    const mutation = useMutation(guests =>{
        return new_api.guests.create(guests, project_name)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['guests', project_name]})
            hiveSocket.send(msg)
        }
    })
    return mutation.mutate
}
export function useAddGuest(){
    const {map_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()
    
    const mutation = useMutation(async ({guest_id, seat_id}) => {
        const res = await api.guest_new.create_belong(guest_id, seat_id, map_name);
        if(res.msg === 'exists') {
            if (window.confirm('המשתמש כבר משובץ האם אתה רוצה לשבץ מחדש?')) {
                await api.guest_new.update_belong(guest_id, seat_id, map_name);
            }
        }
    }, {
        onSuccess: (data, variables,)=>{
            var {guest_id, seat_id} = variables
            queryClient.setQueryData(['belongs', map_name], old => {
                old.forEach((item, index) => {
                    if(item.guest == guest_id) old.splice(index, 1)
                    if(item.seat == seat_id) item.guest = guest_id
                })
                return old
            })
            var msg = JSON.stringify({action: 'invalidate', quert_key: ['belongs', map_name]})
            hiveSocket.send(msg)
        }
    })
    return mutation.mutate
}
export function useScheduling(){

    const [MBloaderStatus, setMBloaderStatus] = useContext(MBloaderContext)

    const {map_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()
    
    const mutation = useMutation(() => {
        // return fetch(`http://localhost:3020/actions/seats_score/${map_name}`, {method: 'GET'})
        // return fetch(`http://localhost:3020/actions/scheduling/${map_name}`, {method: 'GET'})
    }, {
        onMutate: ()=>{
            setMBloaderStatus(true)
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries(['seat_belongs', map_name])
            // setMBloaderStatus(false)
        }
    })
    return mutation
}
export function useDeleteGuest(){
    const {project_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()
    
    const mutation = useMutation(({guest_id}) => {
        return new_api.guests.delete(guest_id)
    }, {
        onMutate: (variables)=>{
            queryClient.setQueryData(['guests', project_name], old => {
                old.forEach((guest, index)=>{
                    if(guest.id === variables.guest_id){
                        old.splice(index, 1)
                    }
                })
                return old
            })
        },
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['guests', project_name]})
            hiveSocket.send(msg)
        }
    })
    return mutation   
}
export function useUpdateTagColor(){
    const {map_name, project_name} = useParams()
    const hiveSocket = useSocket()
    const queryClient = useQueryClient()
    const mutation = useMutation(({tag_id, color}) =>{
        return api.tags.update_color(tag_id, color)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['tags', project_name]})
            hiveSocket.send(msg)
        }
    })
    return mutation.mutate
}
export function useCreateMap(){
    const {project_name} = useParams()
    const hiveSocket = useSocket()
    const mutation = useMutation(({name, rows, cols}) =>{
        return new_api.maps.create(name, rows, cols, project_name)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['maps', project_name]})
            hiveSocket.send(msg)
        }
    })
    return mutation.mutate
}
export function useCreateProject(){
    const hiveSocket = useSocket()
    const mutation = useMutation((name) =>{
        return new_api.projects.create(name)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['projects']})
            hiveSocket.send(msg)
        }
    })
    return mutation.mutate
}
export function useDeleteRequest(){
    const {project_name} = useParams()
    const hiveSocket = useSocket()
    const mutation = useMutation(({request_id}) =>{
        return new_api.requests_belongs.delete(request_id)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ["requests", project_name]})
            hiveSocket.send(msg)
        }
    })
    return mutation.mutate
}
export function useAddRequest(){
    const {project_name} = useParams()
    const hiveSocket = useSocket()
    const mutation = useMutation(({guest_id, tag_id}) =>{
        return new_api.requests_belongs.create(guest_id, tag_id)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ["requests", project_name]})
            hiveSocket.send(msg)
        }
    })
    return mutation.mutateAsync
}
export function useUpdatesGroupColor(){
    const {project_name} = useParams()
    const hiveSocket = useSocket()
    const mutation = useMutation(({group_id, color}) =>{
        return api.guest.update_group_color(group_id, color)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['groups', project_name]})
            hiveSocket.send(msg)
        }
    })
    return mutation.mutate
}
export function useUpdatesGroupScore(){
    const {project_name} = useParams()
    const hiveSocket = useSocket()
    const mutation = useMutation(({group_id, score}) =>{
        return api.guest.update_group_score(group_id, score)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['groups', project_name]})
            hiveSocket.send(msg)
        }
    })
    return mutation.mutate
}
export function useDeleteGroup(){
    const {project_name} = useParams()
    const hiveSocket = useSocket()
    const mutation = useMutation((group_id) =>{
        return new_api.guest_groups.delete(group_id)
    }, {
        onSuccess: ()=>{
            var msg = JSON.stringify({action: 'invalidate', query_key: ['groups', project_name]})
            hiveSocket.send(msg)
        }
    })
    return mutation.mutate
}
export function useGuestsUpdate(){
    const {project_name} = useParams()
    const hiveSocket = useSocket()

    const mutations = {   
        last: useMutation(({guest_id, last}) => {
            return api.guest.update_last_name(last, guest_id)
        }, {
            onSuccess: ()=>{
                var msg = JSON.stringify({action: 'invalidate', query_key: ['guests', project_name]})
                hiveSocket.send(msg)
    
            }
        }),
        first: useMutation(({guest_id, first}) => {
            return api.guest.update_first_name(first, guest_id)
        }, {
            onSuccess: ()=>{
                var msg = JSON.stringify({action: 'invalidate', query_key: ['guests', project_name]})
                hiveSocket.send(msg)
    
            }
        }),
        group: useMutation(({guest_id, group}) => {
            return api.guest.update_group_name(group, guest_id, project_name)
        }, {
            onSuccess: ()=>{
                var msg = JSON.stringify({action: 'invalidate', query_key: ['guests', project_name]})
                hiveSocket.send(msg)
    
            }
        }), 
        score: useMutation(({guest_id, score}) => {
            return api.guest.update_guest_score(guest_id, score)
        }, {
            onSuccess: ()=>{
                var msg = JSON.stringify({action: 'invalidate', query_key: ['guests', project_name]})
                hiveSocket.send(msg)
    
            }
        }),       
    }
    return function(action){
        return mutations[action].mutate
    }
}